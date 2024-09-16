const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const certificationModel = new Schema({
  title: { type: String, trim: true }, // e.g., "Certified AWS Solutions Architect"
  issuedBy: { type: String, trim: true }, // e.g., "Amazon Web Services"
  dateIssued: { type: Date }, // Date the certification was obtained
});

module.exports = mongoose.Schema("certificationModel", certificationModel);
