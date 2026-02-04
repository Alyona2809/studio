const bcrypt = require("bcrypt");
const UserValidator = require("../utils/userValidator");
const formatResponse = require("../utils/formatResponse");
const UserService = require("../services/userService");
const EmailService = require("../services/emailService");
const VerificationCodeService = require("../services/verificationCodeService");
const generateToken = require("../utils/generateTokens");
const cookieConfig = require("../configs/cookieConfig");

class AuthController {
  /** Шаг 1: Запрос регистрации — отправка кода на почту */
  static async registerRequest(req, res) {
    try {
      const { name, email, password, isAdmin, isTutor } = req.body;
      const { isValid, error } = UserValidator.validate({
        name,
        email,
        password,
        isAdmin,
        isTutor,
      });

      if (!isValid) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Валидация не прошла",
            error,
          })
        );
      }

      const normalizedEmail = email.toLowerCase();
      const userFound = await UserService.getByEmail(normalizedEmail);
      if (userFound) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Пользователь с такой почтой уже зарегистрирован",
            error: "Пользователь с такой почтой уже зарегистрирован",
          })
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserService.createPendingRegistration({
        email: normalizedEmail,
        name,
        passwordHash: hashedPassword,
        isAdmin,
        isTutor,
      });

      const code = await VerificationCodeService.createCode(
        normalizedEmail,
        "registration"
      );
      await EmailService.sendVerificationCode(
        normalizedEmail,
        code,
        "registration"
      );

      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Код подтверждения отправлен на почту",
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось отправить код",
          error: error.message,
        })
      );
    }
  }

  /** Шаг 2: Подтверждение регистрации — ввод кода */
  static async registerVerify(req, res) {
    try {
      const { email, code } = req.body;
      const { isValid, error } = UserValidator.validateVerifyCode({
        email,
        code,
      });

      if (!isValid) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Валидация не прошла",
            error,
          })
        );
      }

      const normalizedEmail = email.toLowerCase();
      const isValidCode = await VerificationCodeService.verifyCode(
        normalizedEmail,
        code,
        "registration"
      );
      if (!isValidCode) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Неверный или истёкший код",
            error: "Неверный или истёкший код",
          })
        );
      }

      const pending = await UserService.getPendingRegistration(normalizedEmail);
      if (!pending) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Данные регистрации истекли. Запросите код заново",
            error: "Данные регистрации истекли",
          })
        );
      }

      const user = await UserService.registerUser({
        name: pending.name,
        email: normalizedEmail,
        password: pending.passwordHash,
        isAdmin: pending.isAdmin,
      });
      await UserService.deletePendingRegistration(normalizedEmail);

      const userPlain = user.get ? user.get({ plain: true }) : user;
      delete userPlain.password;

      const { accessToken, refreshToken } = generateToken({ user: userPlain });

      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json(
          formatResponse({
            statusCode: 200,
            message: "Пользователь успешно зарегистрирован",
            data: { accessToken, user: userPlain },
          })
        );
    } catch (error) {
      console.error(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось завершить регистрацию",
          error: error.message,
        })
      );
    }
  }

  /** Восстановление пароля — шаг 1: запрос кода на почту */
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const { isValid, error } = UserValidator.validateEmailOnly({ email });

      if (!isValid) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Валидация не прошла",
            error,
          })
        );
      }

      const normalizedEmail = email.toLowerCase();
      const userFound = await UserService.getByEmail(normalizedEmail);
      if (!userFound) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Пользователь с такой почтой не найден",
            error: "Пользователь с такой почтой не найден",
          })
        );
      }

      const code = await VerificationCodeService.createCode(
        normalizedEmail,
        "password_reset"
      );
      await EmailService.sendVerificationCode(
        normalizedEmail,
        code,
        "password_reset"
      );

      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Код для восстановления пароля отправлен на почту",
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось отправить код",
          error: error.message,
        })
      );
    }
  }

  /** Восстановление пароля — шаг 2: ввод кода и нового пароля */
  static async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;
      const { isValid, error } = UserValidator.validateResetPassword({
        email,
        code,
        newPassword,
      });

      if (!isValid) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Валидация не прошла",
            error,
          })
        );
      }

      const normalizedEmail = email.toLowerCase();
      const isValidCode = await VerificationCodeService.verifyCode(
        normalizedEmail,
        code,
        "password_reset"
      );
      if (!isValidCode) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Неверный или истёкший код",
            error: "Неверный или истёкший код",
          })
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updated = await UserService.updatePassword(
        normalizedEmail,
        hashedPassword
      );
      if (!updated) {
        return res.status(500).json(
          formatResponse({
            statusCode: 500,
            message: "Не удалось обновить пароль",
          })
        );
      }

      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Пароль успешно изменён",
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось восстановить пароль",
          error: error.message,
        })
      );
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase();

      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Пользователь с такой почтой не найден",
            error: "Пользователь с такой почтой не найден",
          })
        );
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Неверный пароль",
            error: "Неверный пароль",
          })
        );
      }
      const userPlain = user.get ? user.get({ plain: true }) : user;
      delete userPlain.password;

      const { accessToken, refreshToken } = generateToken({
        user: userPlain,
      });

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json(
          formatResponse({
            statusCode: 200,
            message: "Пользователь успешно авторизован",
            data: { accessToken, user: userPlain },
          })
        );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось войти",
          error: error.message,
        })
      );
    }
  }

  static async logout(req, res) {
    try {
      res
        .status(200)
        .clearCookie("refreshToken")
        .json(
          formatResponse({
            statusCode: 200,
            message: "Успешный выход",
          })
        );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось выйти",
          error: error.message,
        })
      );
    }
  }

  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateToken({ user });

      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json(
          formatResponse({
            statusCode: 200,
            message: "Перевыпуск токенов успешен!",
            data: { accessToken, user },
          })
        );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить токены",
          error: error.message,
        })
      );
    }
  }
}

module.exports = AuthController;
