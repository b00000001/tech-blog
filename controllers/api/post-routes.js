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
          model: User,
          attributes: ["username"]
        }
      ]
    });
    return res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Posts.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "created_at", "post_content"],
      include: [
        // include the Comment model here:
        {
          model: User,
          attributes: ["username"]
        },
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
            attributes: ["username"]
          }
        }
      ]
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
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

router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.update(
      {
        title: req.body.title,
        text: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
