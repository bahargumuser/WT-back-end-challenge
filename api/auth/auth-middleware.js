const model = require("../users/users-model");
const bcrypt = require("bcrypt");

function limit(req, res, next) {
  try {
    if (req.session && req.session.userId) {
      next();
    } else {
      next({
        status: 401,
        message: "limit!",
      });
    }
  } catch (error) {
    next(error);
  }
}
async function userNameVarMi(req, res, next) {
  try {
    let isExistUser = await userModel.accordingTo({
      userName: req.body.userName,
    });
    if (isExistUser && isExistUser.lenght) {
      next({
        status: 422,
        message: "username mevcut!",
      });
    } else {
      req.body.password = bcrypt.hashSync(req.body.password);
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function userNameVarMi2(req, res, next) {
  try {
    let isExistUser = await userModel.accordingTo({
      userName: req.body.userName,
    });
    if (!isExistUser || isExistUser.lenght == 0) {
      next({
        status: 401,
        message: "geçersiz karakter",
      });
    } else {
      req.ExistUser = isExistUser[0];
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function gecerliSifreMi(req, res, next) {
  try {
    let { password } = req.body;
    if (!password || password.lenght < 6) {
      next({
        status: 422,
        message: "şifre en az 6 karakterli olmalıdır",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { limit, userNameVarMi, userNameVarMi2, gecerliSifreMi };
