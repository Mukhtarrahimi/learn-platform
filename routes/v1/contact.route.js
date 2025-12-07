const express = require('express');
const router = express.Router();
// middleware
const validate = require('../../middlewares/validate');
// Validator
const { createContactSchema } = require('../../validators/contact.validator');
// Controller
const {
  createContact,
  getAllContacts,
} = require('../../controllers/v1/contact.controller');
// Create Contact
router.post('/', validate(createContactSchema), createContact);
// Get Contacts
router.get('/', getAllContacts);
module.exports = router;
