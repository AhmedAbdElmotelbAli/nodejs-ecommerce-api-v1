const slugify = require('slugify');
const CategoryModel = require('../models/Categoremodel');
const asyncHandler = require('express-async-handler')
const ApiError= require('../utils/ApiError');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories =asyncHandler(async (req, res) => {
    const page= req.query.page * 1 ||1;
    const limit= req.query.limit*1|| 3;
    const skip= (page-1)*limit;
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length,page, data: categories });
});
// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  
  if (!category) {
    return next(new ApiError( `No category for this id ${id}` ,404));
    // return res.status(404).json({ msg: `No category for this id ${id}` });
  }

  res.status(200).json({ data: category });
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req,res)=>{

   const name = req.body.name;
   const category=await CategoryModel.create({ name, slug: slugify(name) });
   res.status(201).json({ date: category });
// try{
//    const category=await CategoryModel.create({ name, slug: slugify(name) });
//     res.status(201).json({ date: category });
// }catch(err){
//    res.status(400).send(err);
// }
// CategoryModel.create({ name, slug: slugify(name) })
//   .then(category => res.status(201).json({ date: category }))
//   .catch(err =>
//  res.status(400).send(err));
//   const newCategory = new CategoryModel({ name });
//   newCategory
//     .save()
//     .then((doc) => {
//       res.json(doc);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
});
// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    return next(new ApiError( `No category for this id ${id}` ,404));
  }
  res.status(200).json({ data: category });
});
// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError( `No category for this id ${id}` ,404));
  }
  res.status(204).send();
});
