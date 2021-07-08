const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    return res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
