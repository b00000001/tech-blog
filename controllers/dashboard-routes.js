const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ["id", "title", "created_at", "text"]
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/create/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ["id", "title", "created_at", "text"],
      include: [
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
