const router = require("express").Router();
const { User, Posts } = require("../models");

router.get("/", async (req, res) => {
  res.render("login");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
});

router.get("/homepage", async (req, res) => {
  console.log(req.session);
  try {
    const currentUserData = await User.findByPk(req.session.user_id);
    const user = currentUserData.get({ plain: true });
    const dbPostData = await Posts.findAll({
      // attributes: ["id", "title"],
      // include: [
      //   {
      //     model: User,
      //     attributes: ["username"]
      //   }
      // ]
    });
    const posts = await dbPostData.map((post) => post.get({ plain: true }));
    console.log("Post:", posts);
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
