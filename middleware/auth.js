const { UnauthenticatedError } = require('../errors');
const { verifyToken } = require('../jwt');

const cookieJwtAuth = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

const cookieJwtGetUser = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (token) {
      const user = verifyToken(token);
      req.user = user;
    }
  } catch (error) {
    console.error('JWT verification failed:', error);
  }

  next();
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new UnauthenticatedError('Unauthorized access');
  }
  next();
};

module.exports = {
  cookieJwtAuth,
  isAdmin,
  cookieJwtGetUser,
};
