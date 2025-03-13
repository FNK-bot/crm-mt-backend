const Customer = require("../models/Customer");
const Note = require("../models/Note");

exports.addNote = async (req, res) => {
  try {
    console.log(req.body);
    const { customerId, text } = req.body;
    if (!customerId || !text) {
      return res.status(400).json({ msg: "note text are required" });
    }

    const note = new Note({ customerId, text });
    await note.save();

    await Customer.findByIdAndUpdate(customerId, { $set: { note: note._id } });

    res.status(201).json({ msg: "Note added successfully", note });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
