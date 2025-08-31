const express = require("express");
const { deleteVideo, addVideo } = require("../controller/videoController");

const videoRouter = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/courses");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    // Check if the file is a video
    if (file.fieldname === "video") {
      // Split the base name by underscores
      const parts = baseName.split("_");
      // Get the last part (after the last underscore)
      const newBaseName = parts[parts.length - 1];
      // Form the new filename with extension
      const newFilename = `${newBaseName}${ext}`;
      cb(null, newFilename);
    } else {
      // For thumbnail or other files, keep the original name
      cb(null, file.originalname);
    }
  },
});

const upload = multer({ storage: storage });
const uploadFields = upload.fields([
  { name: "video", maxCount: 20 }, // Adjust maxCount based on your needs
]);
videoRouter.delete("/deleteVideo/:idVideos/:idSection/:idVideo", deleteVideo);
videoRouter.put("/addVideo/:idVideos/:idSection", uploadFields, addVideo);

module.exports = videoRouter;
/* const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
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
); */