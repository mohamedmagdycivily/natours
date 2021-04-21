const express = require('express');
const { json } = require('express');
const morgan = require('morgan');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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
