const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(process.env.NODE_ENV);

//connect to mongoose
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((c) => console.log('DB connection is successful'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`application is listening on port ${port}`);
});
