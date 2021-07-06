const router = require("express").Router();
const { User, Posts } = require("../models");

router.get("/", async (req, res) => {
  console.log(req.session);
  // try {
  //   const dbPostData = await Posts
  //     .findAll
  //     // {
  //     //   attributes: ["id", "title"],
  //     //   include: [{ model: User, attributes: ["username"] }]
  //     // }
  //     // {
  //     //   model: User,
  //     //   attributes: ["username"]
  //     // }
  //     ();
  //   const posts = dbPostData.map((post) => post.get({ plain: true }));
  //   res.render("login", { posts, loggedIn: req.session.loggedIn });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  res.render("login");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
});

router.get("/homepage", async (req, res) => {
  const currentUserData = await User.findByPk(req.session.user_id);
  const user = currentUserData.get({ plain: true });
  res.render("homepage", {
    user
  });
});
module.exports = router;
