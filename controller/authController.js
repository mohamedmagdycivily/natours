const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return next(new AppError('please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  // console.log(user);
  // const correct = await user.correctPassword(password, user.password);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log('in if 1');
  }

  if (!token) {
    return next(new AppError('you are not logged in please log in', '401'));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('the user belonging to this token does no longer exist', 401)
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('user recently changed password please log in again !', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictsTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('you don not have permission to perform this action', 403)
    );
  }
  next();
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email, ' 🧑 ');
  if (!user) {
    return next(new AppError('there is no user whith that email address'), 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
});

exports.resetPassword = catchAsync(async (req, res, next) => {});
