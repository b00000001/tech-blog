const router = require("express").Router();

router.post("/", (req, res) => {
  console.log(req.body);
});

router.post("/login", (req, res) => {
  console.log(req.body);
});
module.exports = router;
