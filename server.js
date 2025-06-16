
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoutes');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');

const ApiError= require('./utils/ApiError');

const GlobalErrHandle= require('./middlewares/ErrorMiddleware')
// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);

app.all('*',(req,res,next)=>{
  // const err = new Error (` con't found route ${req.originalUrl}`)
  // next(err.message);
    next(new ApiError(` con't found route ${req.originalUrl}`,400));

});
// global err handle middlewares
app.use(GlobalErrHandle);
const PORT = process.env.PORT || 8000;
const server= app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});