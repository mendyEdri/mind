const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

const likePost = async (_, { postId }, context) => {
  const { username } = checkAuth(context);

  const post = await Post.findById(postId);

  if (post) {
    if (post.likes.find((like) => like.username === username)) {
      // post already like, unlike it
      post.likes = post.likes.filter((like) => like.username !== username);
      await post.save();
    } else {
      // Not liked, like post
      post.likes.push({
        username,
        createdAt: new Date().toISOString(),
      });
    }

    await post.save();
    return post;
  } else throw new UserInputError("Post not found");
};

const likeCount = (parent) => parent.likes.length;

module.exports = {
  Mutation: {
    likePost,
  },
  Post: {
    likeCount,
  },
};
