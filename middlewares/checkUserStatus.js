const checkUserStatus = (req, res, next) => {
  if (req.user.status !== 'active') {
    return res.status(403).json({
      success: false,
      message: 'your account is not active',
    });
  }
  next();
};

module.exports = checkUserStatus;
