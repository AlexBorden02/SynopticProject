const express = require('express');
const router = express.Router();
const { results } = require("../controllers/db")

router.post('/results', results)


module.exports = router;