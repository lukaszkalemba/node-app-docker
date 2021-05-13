const express = require('express');
const postController = require('../controllers/postController');
const isAuthenticated = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(isAuthenticated, postController.createPost);

router
  .route('/:id')
  .get(postController.getOnePost)
  .patch(isAuthenticated, postController.updatePost)
  .delete(isAuthenticated, postController.deletePost);

module.exports = router;
