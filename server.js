const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(process.env.NODE_ENV);

// testTour = new Tour({
//   name: 'my second tour',
//   rating: 4.2,
//   price: 55,
// });
// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log('ERORR  😠😠😠  ', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`application is listening on port ${port}`);
});
