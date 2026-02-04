const { User, PendingRegistration } = require("../../db/models");
const { Op } = require("sequelize");

class UserService {
  static async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  static async getOneUser(id) {
    const user = await User.findByPk(id);
    return user;
  }

  static async registerUser({ name, password, email, isAdmin }) {
    const user = await User.create({
      name,
      password,
      email,
      isAdmin: isAdmin ?? false,
    });
    return user;
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    user.destroy();
    return id;
  }

  static async updateUser(id, data) {
    const user = await User.update(data, { where: { id } });
    if (user) {
      return user;
    }
    return false;
  }

  static async getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  static async createPendingRegistration({
    email,
    name,
    passwordHash,
    isAdmin,
  }) {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    const normalizedEmail = email.toLowerCase();
    let pending = await PendingRegistration.findOne({
      where: { email: normalizedEmail },
    });
    if (pending) {
      await pending.update({
        name,
        passwordHash,
        isAdmin: isAdmin ?? false,
        expiresAt,
      });
    } else {
      pending = await PendingRegistration.create({
        email: normalizedEmail,
        name,
        passwordHash,
        isAdmin: isAdmin ?? false,
        expiresAt,
      });
    }
    return pending;
  }

  static async getPendingRegistration(email) {
    const pending = await PendingRegistration.findOne({
      where: {
        email: email.toLowerCase(),
        expiresAt: { [Op.gt]: new Date() },
      },
    });
    return pending;
  }

  static async deletePendingRegistration(email) {
    await PendingRegistration.destroy({
      where: { email: email.toLowerCase() },
    });
  }

  static async updatePassword(email, passwordHash) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) return false;
    await user.update({ password: passwordHash });
    return true;
  }
}

module.exports = UserService;
