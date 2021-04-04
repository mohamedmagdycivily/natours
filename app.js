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

const port = 3000;
app.listen(port, () => {
  console.log(`application is listening on port ${port}`);
});
