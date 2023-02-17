const express = require('express');

const {
  getUser,
  createUser,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').post(createUser).patch(updateUser);
router.route('/:id').get(getUser);

module.exports = router;
