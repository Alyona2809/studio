const cookieConfig = require("../configs/cookieConfig");
const UserService = require("../services/userService");
const formatResponse = require("../utils/formatResponse");
const generateTokens = require("../utils/generateTokens");

class UserController {
  static async getAll(req, res) {
    try {
      const result = await UserService.getAllUsers();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все пользователи",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(401).json(
        formatResponse({
          statusCode: 401,
          message: "У тебя нет прав",
          error: error.message,
        })
      );
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getOneUser(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Один пользователь",
          data: user,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить пользователя",
          error: error.message,
        })
      );
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.deleteUser(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Пользователь успешно удалён",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить пользователя",
          error: error.message,
        })
      );
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      await UserService.updateUser(id, {
        name,
        email,
      });
      const updatedUser = await UserService.getOneUser(id);
      delete updatedUser.password;
      const { accessToken, refreshToken } = generateTokens({
        user: updatedUser,
      });
      delete updatedUser.password;
      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json(
          formatResponse({
            statusCode: 200,
            message: "Пользователь успешно обновлён",
            data: { accessToken, updatedUser },
          })
        );
    } catch (error) {
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось обновить пользователя",
          error: error.message,
        })
      );
    }
  }

  static async create(req, res) {
    try {
      const { email, password, name, isAdmin } = req.body;
      const newUser = await UserService.registerUser({
        email,
        password,
        name,
        isAdmin,
      });

      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Пользователь успешно создан в БД",
          data: newUser,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось создать пользователя в БД",
          error: "Не удалось создать пользователя в БД",
        })
      );
    }
  }
}

module.exports = UserController;
