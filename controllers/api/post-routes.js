const router = require("express").Router();
const { Posts, User } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "created_at", "post_content"],
      order: [["created_at", "DESC"]],
      include: [
        // Comment model here -- attached username to comment
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at"
          ],
          include: {
            model: User,
            attributes: ["username", "twitter", "github"]
          }
        },
        {
          model: User,
          attributes: ["username", "twitter", "github"]
        }
      ]
    });
    return res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.create({
      title: req.body.title,
      text: req.body.post_content,
      user_id: req.session.user_id
    });
    return res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
