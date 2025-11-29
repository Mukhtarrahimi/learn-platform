const User = require('../../models/user.model');
// GET ME
const getMe = async (req, res) => {
  try {
    const userId = req.params.id;
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

module.exports = {
  getMe,
};
