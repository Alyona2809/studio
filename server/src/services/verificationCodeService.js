const { VerificationCode } = require("../../db/models");
const { Op } = require("sequelize");
const crypto = require("crypto");

const CODE_EXPIRY_MINUTES = 10;
const CODE_LENGTH = 4;

class VerificationCodeService {
  static generateCode() {
    return crypto.randomInt(1000, 9999).toString();
  }

  static async createCode(email, purpose) {
    await this.invalidatePreviousCodes(email, purpose);
    const code = this.generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + CODE_EXPIRY_MINUTES);

    await VerificationCode.create({
      email: email.toLowerCase(),
      code,
      purpose,
      expiresAt,
      used: false,
    });
    return code;
  }

  static async invalidatePreviousCodes(email, purpose) {
    await VerificationCode.update(
      { used: true },
      {
        where: {
          email: email.toLowerCase(),
          purpose,
          used: false,
        },
      }
    );
  }

  static async verifyCode(email, code, purpose) {
    const record = await VerificationCode.findOne({
      where: {
        email: email.toLowerCase(),
        code,
        purpose,
        used: false,
        expiresAt: { [Op.gt]: new Date() },
      },
    });
    if (!record) return false;
    await record.update({ used: true });
    return true;
  }
}

module.exports = VerificationCodeService;
