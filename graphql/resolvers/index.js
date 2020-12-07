const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolver = require('./comments'); 
const likesResolver = require('./likes');

module.exports = {
    Post: {
        ...likesResolver.Post,
        ...commentsResolver.Post
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolver.Mutation,
        ...likesResolver.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}