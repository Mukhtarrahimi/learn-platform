const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

// GET ALL USERS
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

// GER USER BY ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select(
      '-hash_password -refreshToken'
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'no user found',
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user by id',
      error: err.message,
    });
  }
};

// GET USER BY QUERY (username, email, status)
const getUserByQuery = async (req, res) => {
  try {
    const { username, email, status } = req.query;

    // Build dynamic query object
    const query = {};
    if (username) query.username = username;
    if (email) query.email = email;
    if (status) query.status = status;

    const users = await User.find(query).select('-hash_password -refreshToken');

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
      });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users by query',
      error: err.message,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id, email } = req.body;
    if (!id || !email) {
      return res.status(401).json({
        success: false,
        message: 'please provide user id or email',
      });
    }
    const query = {};
    if (id) query._id = id;
    if (email) query.email = email;
    const user = await User.findOneAndDelete(query);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error delete user by id',
      error: err.message,
    });
  }
};
module.exports = {
  getAllUser,
  getUserById,
  getUserByQuery,
  deleteUser,
};
