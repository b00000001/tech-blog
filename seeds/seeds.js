const sequelize = require("../config/connection");
const { User, Posts } = require("../models");
const userData = require("./userData.json");
const postData = require("./PostSeed.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  await Posts.bulkCreate(postData, {
    individualHooks: true,
    returning: true
  });
  process.exit(0);
};

seedDatabase();
