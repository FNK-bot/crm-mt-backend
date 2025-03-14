const { validationResult } = require("express-validator");
const Customer = require("../models/Customer");

// Create Customer
exports.createCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array(), msg: "fill the fields" });

  try {
    const findCustomer = await Customer.findOne({ email: req.body.email });
    if (findCustomer)
      return res.status(400).json({ msg: "Email already exists" });
    const newCustomer = new Customer({ ...req.body, user: req.user.id });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// Get Customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate("deal")
      .populate("note")
      .exec();

    res.json(customers);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update Customer
exports.updateCustomer = async (req, res) => {
  try {
    const findCustomer = await Customer.findOne({ email: req.body.email });
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
