const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

const getPosts = async () => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  } catch (err) {
    throw new Error(err);
  }
};

const getPost = async (_, { postId }) => {
  try {
    const post = await Post.findById(postId);
    if (post) {
      return post;
    } else {
      throw new Error("Post not found");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const createPost = async (_, { body }, context) => {
  const user = checkAuth(context);

  if (body.trim() === "") {
    throw new Error("Post body must not be empty");
  }

  const newPost = new Post({
    body,
    user: user.id,
    username: user.username,
    createdAt: new Date().toISOString(),
  });

  const post = await newPost.save();
  context.pubsub.publish("NEW_POST", {
    newPost: post,
  });

  return post;
};

const deletePost = async (_, { postId }, context) => {
  const user = checkAuth(context);

  try {
    const post = await Post.findById(postId);
    if (user.username === post.username) {
      await post.delete();
      return `Post ${postId} deleted successfully`;
    } else {
      throw new AuthenticationError("Action not allowed");
    }
  } catch (err) {
    throw Error(err);
  }
};

const subscribe = async (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST");

module.exports = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    createPost,
    deletePost,
  },
  Subscription: {
    newPost: { subscribe },
  },
};
