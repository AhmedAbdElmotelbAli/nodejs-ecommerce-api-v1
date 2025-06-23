const multer  = require('multer');
const sharp = require('sharp');
const factory = require('./handlersFactory');
const { v4: uuidv4 } = require('uuid');
const Category = require('../models/Categoremodel');

const ApiError = require('../utils/ApiError');
const multerStorage = multer.memoryStorage();
const asyncHandler = require('express-async-handler');


// Upload single image
const multerFilter =function (req, file, cb) {

  if(file.mimetype.startsWith("image"))
    {
      cb(null, true);
    }else{
      cb(new ApiError("only image allowed",400),false);
    }
  
}
//diskStorage
// const multerStorage= multer.diskStorage({
//   destination: function (req, file, cb) {
//     //C:\nodejs\nodejs-ecommerce-api-v1\package-lock.json
//     cb(null, 'C:/nodejs/nodejs-ecommerce-api-v1/uploads/Categories')
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1];
//     const filename = `category-${uuidv4()}-${Date.now()}-.${ext}`;
//     cb(null, filename )
//   }
// });

const upload = multer({ storage: multerStorage,fileFilter:multerFilter })
exports.uploadCategoryImage =upload.single('image');

exports.resizeImage = asyncHandler(async(req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}-.jpeg`;
await sharp(req.file.buffer).resize(500,500).toFormat("jpeg").jpeg({quality:80}).toFile(`uploads/Categories/${filename}`);
next();
});
const uploadCategoryImage = upload.single("image");
// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getCategories = factory.getAll(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.deleteOne(Category);