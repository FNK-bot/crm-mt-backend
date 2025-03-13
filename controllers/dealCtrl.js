const Deal = require("../models/Deal");
const Customer = require("../models/Customer");

// Create Deal
exports.createDeal = async (req, res) => {
  try {
    const { customerId, amount, status } = req.body;

    if (!customerId || !amount) {
      return res.status(400).json({ msg: " amount are required" });
    }

    // Create new deal
    const deal = new Deal({ customerId, amount, status });
    await deal.save();

    await Customer.findByIdAndUpdate(customerId, { $set: { deal: deal._id } });

    res.status(201).json({ msg: "Deal added successfully", deal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
