const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Post must have title'],
  },
  body: {
    type: String,
    require: [true, 'Post must have body'],
  },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
