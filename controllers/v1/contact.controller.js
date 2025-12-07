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

// Get  All Contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No contacts found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      contacts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error getAllContacts api',
      error: err.message,
    });
  }
};

// Remove Contact - Admin Only
const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Contact removed successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error Remove contact api',
      error: err.message,
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  removeContact,
};
