/**
 * Create schema 
 * Convert to model 
 */
const mongoose = require('mongoose');

// 1- Create Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category is required'],
    unique: [true, 'Category must be unique'],
    minlength: [3, 'Too short category name'],
    maxlength: [32, 'Too long category name'],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  image: {
    type: String,
  }
}, { timestamps: true });  // Correct casing

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
