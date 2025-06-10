const express = require('express');

const { getCategories } = require('../services/categoreService');

const router = express.Router();

router.get('/', getCategories);

module.exports = router;