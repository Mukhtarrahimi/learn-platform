const express = require('express');
const router = express.Router();
// middleware
const validate = require('../../middlewares/validate');
const checkAdmin = require('../../middlewares/checkAdmin');
// Validator
const { createContactSchema } = require('../../validators/contact.validator');
// Controller
const {
  createContact,
  getAllContacts,
  removeContact,
} = require('../../controllers/v1/contact.controller');
// Create Contact
router.post('/', validate(createContactSchema), createContact);
// Get Contacts
router.get('/', getAllContacts);
// Remove Contact - Admin Only
router.delete('/:contactId', checkAdmin, removeContact);
module.exports = router;
