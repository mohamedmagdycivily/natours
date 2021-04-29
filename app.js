const express = require('express');
const { json } = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests frm this id, please try again later in 1 hour ',
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log('headers = ', req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//handling wrong requests
app.all('*', (req, res, next) => {
  next(new AppError(`there is no ${req.originalUrl} on this server `, 404));
});

app.use(globalErrorHandler);

module.exports = app;
