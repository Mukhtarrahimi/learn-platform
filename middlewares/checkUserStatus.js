const checkUserStatus = (req, res, next) => {
  if (!req.user || req.user.status !== 'active') {
    return res.status(403).json({
      success: false,
      message:
        req.user?.status === 'banned'
          ? 'Your account has been permanently banned'
          : 'Your account is temporarily blocked',
    });
  }
  next();
};

module.exports = checkUserStatus;
