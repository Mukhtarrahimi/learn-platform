const User = require('../../models/user.model');

const register = async (req, res) => {
  try {
    const { name, username, email, phone, password, role } = req.body;

    const existUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = await User.create({
      name,
      username,
      email,
      hash_password: password,
      phone,
      role: role || 'student', // default
    });
    // Delete Password
    const userSafe = user.toObject();
    delete userSafe.hash_password;
    delete userSafe.password;

    res.status(201).json({
      success: true,
      message: 'User successfully registered',
      user: userSafe,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error in register API',
      error: err.message,
    });
  }
};

module.exports = { register };
