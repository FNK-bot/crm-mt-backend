const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    deal: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
    note: { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
