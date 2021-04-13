const fs = require('fs');
const Tour = require('../models/tourModel');

// let tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
// exports.checkId = (req, res, next, val) => {
//   //transform string to number
//   console.log('in check id middleware');
//   const id = req.params.id * 1;
//   // if (id > tours.length - 1) {
//   //   return res.status(404).json({
//   //     status: 'fail',
//   //     message: 'Invalid ID',
//   //   });
//   // }
//   next();
// };

exports.checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'bad request',
      message: 'send price and name',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tours: tours,
  //   },
  // });
};

exports.getTour = (req, res) => {
  //transform string to number
  console.log(req.requestTime);
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};
exports.updateTour = (req, res) => {
  //transform string to number
  const id = req.params.id * 1;
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};

exports.createTour = (req, res) => {
  //prepare the tour that will be added
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  // //add tour to tours array
  // tours.push(newTour);
  // //rewrite tours array & send response to the client
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  });
};
