const { User } = require("../../db/models");

const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: 401,
        message: "Необходима авторизация",
        data: null,
        error: "Unauthorized",
      });
    }

    const user = await User.findByPk(userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        status: 403,
        message: "Доступ запрещен. Требуются права администратора",
        data: null,
        error: "Forbidden",
      });
    }

    req.adminUser = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Внутренняя ошибка сервера",
      data: null,
      error: error.message,
    });
  }
};

module.exports = checkAdmin;
