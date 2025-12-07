const Contact = require('../../models/contact.model');

const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });
    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      contact,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error creating contact api',
      error: err.message,
    });
  }
};

module.exports = {
  createContact,
};
