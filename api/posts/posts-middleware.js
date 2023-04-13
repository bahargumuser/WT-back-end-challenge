const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secrets/secret-token");
const { findPost } = require("./posts-model");

const userConfirm = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      jwt.confirm(token, JWT_SECRET, (error, decodeJWT) => {
        if (error) {
          req
            .status(401)
            .json({ message: "token geçerli değil, yeniden giriş yapınız " });
        } else {
          req.codeToken = decodeJWT;
          next();
        }
      });
    } else {
      res
        .status(402)
        .json({ message: "token mevcut değil, yeniden giriş yapınız" });
    }
  } catch (error) {
    next(error);
  }
};
const validToken = async (req, res, next) => {
  if (!req.codeToken.userId) {
    res.status(401).json({
      message: "token geçerli değil",
    });
  } else {
    next();
  }
};
const changePost = async (req, res, next) => {
  //Postun id'si ile arama yapabilmek için
  const intentPost = await findPost(req.params.id);
  if (req.codeToken.userId !== intentPost[0].userId) {
    res.status(401).json({
      message: `yetki yok ${intentPost[0].userId} ; ${req.codeToken.userId}`,
    });
  } else {
    next();
  }
};
const changeAuth = async (req, res, next) => {
  const codeToken = await findPost(req.params.id);
  if (codeToken.userId !== intentPost[0].userId) {
    res.status(401).json({
      message: `yetki yok ${intentPost[0].userId} ; ${req.codeToken.userId}`,
    });
  } else {
    next();
  }
};

module.exports = {
  userConfirm,
  validToken,
  changePost,
  changeAuth,
};
