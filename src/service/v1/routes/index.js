const express = require('express');

const notesRoute = require('./notes');
const titlesRoute = require('./titles');

const router = express.Router();

router.use('/notes', notesRoute);
router.use('/titles', titlesRoute);

module.exports = router;
