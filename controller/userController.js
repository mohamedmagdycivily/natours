const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  //Execute query
  const tours = await User.find();

  //send response
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
exports.deleteUSer = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined ',
  });
};
