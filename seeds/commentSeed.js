const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 5,
    comment_text: "That is awesome!!"
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text: "Good job, hope to see more!"
  },
  {
    user_id: 1,
    post_id: 4,
    comment_text: "Thank you, this has been a good experience!"
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
