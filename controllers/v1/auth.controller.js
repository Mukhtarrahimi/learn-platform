const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const { accessToken, refreshToken } = require('../../middlewares/token');
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
      role: 'student',
    });
    res.status(201).json({
      success: true,
      message: 'User successfully registered',
      user,
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

// LOGIN USER
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+hash_password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message:
          user.status === 'banned'
            ? 'Your account has been permanently banned'
            : 'Your account has been temporarily blocked',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const access_Token = accessToken(user);
    const refresh_Token = refreshToken(user);

    res.status(200).json({
      success: true,
      message: 'User login successful',
      accessToken: access_Token,
      refreshToken: refresh_Token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error in login API',
    });
  }
};

module.exports = { register, login };
