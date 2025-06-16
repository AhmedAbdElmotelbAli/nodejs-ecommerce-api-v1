const multer  = require('multer');
const factory = require('./handlersFactory');
const { v4: uuidv4 } = require('uuid');
const Category = require('../models/Categoremodel');
const ApiError = require('../utils/ApiError');
//diskStorage
const multerStorage= multer.diskStorage({
  destination: function (req, file, cb) {
    //C:\nodejs\nodejs-ecommerce-api-v1\package-lock.json
    cb(null, 'C:/nodejs/nodejs-ecommerce-api-v1/uploads/Categories')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `category-${uuidv4()}-${Date.now()}-.${ext}`;
    cb(null, filename )
  }
});
const multerFilter= function (req, file, cb) {
    if(file.mimetype.startsWith('image')){
          cb(null, true )
    }else {
      cb(new ApiError("image only allow",400) ,false);
    }
  }
;

const upload = multer({ storage: multerStorage,fileFilter:multerFilter })
exports.uploadCategoryImage =upload.single('image');
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