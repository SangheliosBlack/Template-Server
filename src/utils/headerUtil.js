import error  from '../helpers/logger.js';

function getTokenHeader(req){
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
    error(err.message, err);
  }
  return token;
}

export default getTokenHeader;
