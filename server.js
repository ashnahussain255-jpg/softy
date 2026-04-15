const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe');

// 1. Configurations
dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "https://softy3.vercel.app", 
  credentials: true
}));

// Preflight Fix for new Express versions
app.options('(.*)', cors());

app.use(express.json());

// 2. Stripe initialization
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ ERROR: STRIPE_SECRET_KEY is missing in .env");
  process.exit(1);
}
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// 3. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Softy Pearl Database Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// 4. Order Schema & Model
const orderSchema = new mongoose.Schema({
  customer: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: Object,
  },
  items: Array,
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  stripeSessionId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// 5. API ROUTES

// --- Route: Create Stripe Checkout Session ---
app.post('/api/payment/checkout', async (req, res) => {
  const { cartItems, customerInfo } = req.body;

  if (!cartItems || cartItems.length === 0 || !customerInfo) {
    return res.status(400).json({ error: "Cart is empty or customer info missing" });
  }

  try {
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: 'pkr',
        product_data: {
          name: item.title,
          images: [item.img],
        },
        unit_amount: parseInt(item.price.replace(/[^0-9]/g, "")) * 100,
      },
      quantity: item.qty,
    }));

 const session = await stripeClient.checkout.sessions.create({
  // ... baaki code
  success_url: `https://softy3.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `https://softy3.vercel.app/checkout`,
});

    const newOrder = new Order({
      customer: customerInfo,
      items: cartItems,
      totalAmount: session.amount_total / 100,
      stripeSessionId: session.id,
      paymentStatus: 'Pending'
    });
    
    await newOrder.save();
    res.status(200).json({ id: session.id });

  } catch (error) {
    console.error("❌ Stripe Session Error:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// --- Route: Verify Payment Status ---
app.get('/api/orders/verify/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const updatedOrder = await Order.findOneAndUpdate(
        { stripeSessionId: sessionId },
        {
          $set: {
            paymentStatus: 'Paid',
            'customer.address': session.shipping_details?.address,
            'customer.name': session.shipping_details?.name
          }
        },
        { new: true }
      );
      res.status(200).json({ status: 'Success', order: updatedOrder });
    } else {
      res.status(400).json({ status: 'Failed', message: 'Payment not verified' });
    }
  } catch (error) {
    console.error("❌ Verification Error:", error.message);
    res.status(500).json({ error: "Verification process failed" });
  }
});

// --- Route: Admin View (Get All Orders) ---
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

// 6. Server Launch
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  -----------------------------------------
  🚀 SERVER RUNNING ON PORT: ${PORT}
  🔗 API: http://localhost:${PORT}/api
  -----------------------------------------
  `);
});
