const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('uncaughtException ...shutting down 🔥');

  process.exit(1);
});

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
  .then(() => console.log('DB connection is successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`application is listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandledRejection ...shutting down 🔥');
  server.close(() => {
    process.exit(1);
  });
});
