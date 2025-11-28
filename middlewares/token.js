const jwt = require('jsonwebtoken');
const accessToken = (user) => {
  jwt.sign({ email, password }, process.env.ACCESS_TOKEN_SECRET);
};
const refreshToken = (user) => {};

module.exports = {
  accessToken,
  refreshToken,
};
