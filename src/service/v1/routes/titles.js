const express = require('express');

const titleController = require('../controllers/titles');

const router = express.Router();

router.get('/', titleController.getAll);
router.get('/:id', titleController.get);
router.delete('/:id', titleController.remove);
router.put('/:id', titleController.update);
router.post('/', titleController.add);

module.exports = router;
