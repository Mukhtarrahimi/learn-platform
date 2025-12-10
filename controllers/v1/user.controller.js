const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

// GET ME
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '-hash_password -refreshToken'
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error getting user' });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    ).select('-hash_password -refreshToken');

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+hash_password');

    const isMatch = await bcrypt.compare(oldPassword, user.hash_password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Old password is incorrect' });
    }

    user.hash_password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Error changing password' });
  }
};

module.exports = {
  getMe,
  updateProfile,
  changePassword,
};
