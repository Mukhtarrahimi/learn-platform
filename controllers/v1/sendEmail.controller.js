const ReplyContact = require('../../models/replyContact.model');
const Contact = require('../../models/contact.model');
const sendEmail = require('../../utils/sendEmail');

const sendMailReply = async (req, res) => {
  try {
    const { contactId, message } = req.body;

    // Validate contact existence
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Create a new reply contact entry
    const replyContact = new ReplyContact({
      contactId,
      message,
    });
    await replyContact.save();

    // Send email to the contact
    await sendEmail({
      to: contact.email,
      subject: 'پاسخ به پیام شما',
      text: message,
    });

    // Update contact status
    contact.status = 'replied';
    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Reply sent and contact status updated',
      data: replyContact,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error in sending reply email',
      error: err.message,
    });
  }
};

module.exports = sendMailReply;
