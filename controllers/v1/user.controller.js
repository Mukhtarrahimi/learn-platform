const User = require('../../models/user.model');
// GET ME
const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select(
      '-hash_password -refresh_Token'
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error in login API',
    });
  }
};
// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, email },
      { new: true }
    ).select('-hash_password -refreshToken');

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
};

module.exports = {
  getMe,
};
