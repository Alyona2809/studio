const jwt = require("jsonwebtoken");
require("dotenv").config();
const formatResponse = require("../utils/formatResponse");
const UserService = require("../services/userService");

const verifyAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const existingUser = await UserService.getOneUser(user.id);
    if (!existingUser) {
      return res
        .status(401)
        .json(formatResponse(401, "Пользователь не найден"));
    }

    req.user = existingUser;
    res.locals.user = existingUser;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(formatResponse(401, "Unauthorized"));
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies || {};

    if (!refreshToken) {
      return res
        .status(401)
        .json(formatResponse(401, "Refresh token отсутствует"));
    }

    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const existingUser = await UserService.getOneUser(user.id);
    if (!existingUser) {
      return res
        .clearCookie("refreshToken")
        .status(401)
        .json(formatResponse(401, "Пользователь не найден"));
    }

    res.locals.user = existingUser;

    return next();
  } catch (error) {
    console.log(error);
    return res
      .clearCookie("refreshToken")
      .status(401)
      .json(formatResponse(401, "Unauthorized"));
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
