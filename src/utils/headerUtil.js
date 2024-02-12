const logger = require('../helpers/logger');

exports.getTokenHeader = (req) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  } catch (err) {
    logger.error(err.message, err);
  }
  return token;
};
