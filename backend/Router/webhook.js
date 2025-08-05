// routes/webhook.ts

const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-08-01",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("✅ Payment succeeded:", session.id);

      // 👉 Example: Enroll user, update DB, send email, etc.
      const courseId = session.metadata?.courseId;
      const userId = session.metadata?.userId;

      // e.g., enrollUser(userId, courseId);
    }

    res.sendStatus(200);
  }
);

module.exports = router;

