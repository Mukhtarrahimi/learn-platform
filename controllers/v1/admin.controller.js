const User = require('../../models/user.model');
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
    console.log(err);
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

const changeUserStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const id = req.params.id;

    // Validate status
    if (!['active', 'blocked', 'banned'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Choose: active, blocked, banned',
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update status
    user.status = status;

    if (status === 'blocked' || status === 'banned') {
      user.blockedAt = new Date();
      user.blockedReason =
        reason ||
        (status === 'banned' ? 'Banned by admin' : 'Blocked by admin');
    } else if (status === 'active') {
      user.blockedAt = null;
      user.blockedReason = null;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: `User status changed to ${status} successfully`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error changing user status',
      error: err.message,
    });
  }
};

// CREATE NEW USER
const createUserByAdmin = async (req, res) => {
  try {
    const { name, username, email, phone, password, role, status } = req.body;

    const existUser = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (existUser) {
      if (existUser.status === 'banned') {
        return res.status(403).json({
          success: false,
          message: 'Your account has been permanently banned',
        });
      }

      if (existUser.status === 'blocked') {
        return res.status(403).json({
          success: false,
          message: 'Your account is temporarily blocked',
        });
      }

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
      status,
      role: role,
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

const updateUserByAdmin = async (req, res) => {
  try {
    const { name, username, email, phone, role, status, blockedReason } =
      req.body;
    const { id } = req.params;

    const allowedRoles = ['student', 'teacher', 'admin'];
    const allowedStatus = ['active', 'blocked', 'banned'];

    const updatedData = {
      name,
      username,
      email,
      phone,
    };

    if (role && allowedRoles.includes(role)) updatedData.role = role;
    if (status && allowedStatus.includes(status)) updatedData.status = status;
    if (blockedReason) updatedData.blockedReason = blockedReason;

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).select('-hash_password -refreshToken');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: err.message,
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByQuery,
  deleteUser,
  changeUserStatus,
  createUserByAdmin,
  updateUserByAdmin,
};
