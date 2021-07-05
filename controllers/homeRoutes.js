const router = require("express").Router();
const { User } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/homepage", async (req, res) => {
  const currentUserData = await User.findByPk(req.session.user_id);
  const user = currentUserData.get({ plain: true });
  res.render("homepage", {
    user
  });
});
module.exports = router;
