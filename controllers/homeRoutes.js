const router = require("express").Router();
const { User, Posts } = require("../models");

router.get("/", async (req, res) => {
  console.log(req.session);
  try {
    const dbPostData = await Posts.findAll({
      attributes: ["id", "title", "created_at", "text"]
    });
    const posts = await dbPostData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Posts.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "created_at", "text"]
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render("showpost", {
      post,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
