const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const { createContactSchema } = require('../../validators/contact.validator');
const { createContact } = require('../../controllers/v1/contact.controller');
// Create Contact
router.post('/', validate(createContactSchema), createContact);
module.exports = router;
