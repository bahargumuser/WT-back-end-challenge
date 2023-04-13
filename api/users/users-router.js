const express = require("express").Router();
const mw = require("../auth/auth-middleware");
const { router } = require("../server");
const userModel = require("../users/users-model");

router.get("/", mw.limit, async (req, res, next) => {
  try {
    let allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
