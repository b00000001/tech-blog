const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, User, Comment } = require("../models");
const withAuth = require("../utils/auth");
const { route } = require("./homeRoutes");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ["id", "title", "created_at", "text"],
      include: [
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
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "created_at", "text"],
      include: [
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
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render("editpost", {
      post,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/create/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: ["id", "title", "created_at", "text"],
      include: [
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
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("createpost", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
