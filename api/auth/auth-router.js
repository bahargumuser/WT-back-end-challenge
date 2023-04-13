const router = require("express").Router();
const mw = require("./auth-middleware");
const bcryptjs = require("bcryptjs");
const userModel = require("../users/users-model");

router.post(
  "/register",
  mw.gecerliSifreMi,
  mw.userNameVarMi,
  async (req, res, next) => {
    try {
      let hashPassword = bcryptjs.hashSync(req.body.password);
      let model = { userName: req.body.userName, password: hashPassword };
      let insertUser = await userModel.add(model);
      res.status(201).json(insertUser);
    } catch (error) {
      next(error);
    }
  }
);
router.post("/login", mw.userNameVarMi, async (req, res, next) => {
  try {
    let isValidPassword = bcryptjs.compareSync(
      req.body.userName,
      ExistUsers.password
    );
    if (isValidPassword) {
      res.json({
        message: `merhaba ${req.body.userName}`,
      });
    } else {
      //LOGIN
      req.session.userId = req.ExistUsers.userId; //cookie session yöntemi
      next({
        status: 401,
        message: "geçersiz karakter",
      });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/logout", (req, res, next) => {
  try {
    if (req.session.userId) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ message: "destroy edilemedi" });
        } else {
          res.json({ message: "çıkış yapıldı" });
        }
      });
    } else {
      res.status(200).json({
        message: "oturum bulunamadı",
      });
    }
  } catch (error) {}
});
router.post(
  "/register",
  mw.gecerliSifreMi,
  mw.userNameVarMi,
  (req, res, next) => {
    try {
      let hashPassword = bcryptjs.hashSync(req.body.password);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
