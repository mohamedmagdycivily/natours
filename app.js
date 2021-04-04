const fs = require('fs');
const express = require('express');
const { json } = require('express');
const app = express();

//to add the body to the req
app.use(express.json());

//read all tours
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//handle the get all tours req
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
//handel the get specific tour
app.get('/api/v1/tours/:id', (req, res) => {
  //transform string to number
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
//handel update tour
app.patch('/api/v1/tours/:id', (req, res) => {
  //transform string to number
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
});
//handle post a new tour req
app.post('/api/v1/tours', (req, res) => {
  //prepare the tour that will be added
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //add tour to tours array
  tours.push(newTour);
  //rewrite tours array & send response to the client
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});
//handel delete tour
app.delete('/api/v1/tours/:id', (req, res) => {
  //transform string to number
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`application is listening on port ${port}`);
});
