/**
 * Шаблоны писем с кодами подтверждения.
 * Внешний вид письма задаётся здесь на бэкенде (фронт письма не формирует).
 * Можно менять текст, тему и HTML-оформление.
 */

const CODE_EXPIRY_MINUTES = 10;

function getRegistrationContent(code) {
  const subject = "Код подтверждения регистрации";
  const text = `Ваш код подтверждения: ${code}. Введите его для завершения регистрации. Код действителен ${CODE_EXPIRY_MINUTES} минут.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
      <h2 style="color: #333;">Подтверждение регистрации</h2>
      <p>Здравствуйте!</p>
      <p>Ваш код для завершения регистрации:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #1a73e8;">${code}</p>
      <p style="color: #666; font-size: 14px;">Код действителен ${CODE_EXPIRY_MINUTES} минут.</p>
      <p>Если вы не регистрировались — просто проигнорируйте это письмо.</p>
    </div>
  `;
  return { subject, text, html };
}

function getPasswordResetContent(code) {
  const subject = "Код для восстановления пароля";
  const text = `Ваш код для восстановления пароля: ${code}. Код действителен ${CODE_EXPIRY_MINUTES} минут.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
      <h2 style="color: #333;">Восстановление пароля</h2>
      <p>Здравствуйте!</p>
      <p>Ваш код для сброса пароля:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #1a73e8;">${code}</p>
      <p style="color: #666; font-size: 14px;">Код действителен ${CODE_EXPIRY_MINUTES} минут.</p>
      <p>Если вы не запрашивали сброс — проигнорируйте это письмо.</p>
    </div>
  `;
  return { subject, text, html };
}

module.exports = {
  getRegistrationContent,
  getPasswordResetContent,
};
