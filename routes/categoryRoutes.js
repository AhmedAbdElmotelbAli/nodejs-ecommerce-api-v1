const express = require('express');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');


const { getCategories,createCategory, getCategory,   updateCategory,deleteCategory,uploadCategoryImage, resizeImage, } = require('../services/categoreService');

const router = express.Router();
router.route('/').get(getCategories).post(uploadCategoryImage,createCategoryValidator,createCategory);
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(uploadCategoryImage,resizeImage,updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;