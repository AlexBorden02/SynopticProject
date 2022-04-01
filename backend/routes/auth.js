const express = require('express');
const router = express.Router();
const { signup, signin, authenticate } = require('../controllers/auth');
//router.post('/signup', signup);
router.post('/signin', signin);
router.post('/authenticate', authenticate)
module.exports = router;
