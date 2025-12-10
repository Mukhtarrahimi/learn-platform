const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select('-hash_password -refreshToken');

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: err.message,
    });
  }
};

module.exports = {
  getAllUser,
};
