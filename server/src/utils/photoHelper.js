/**
 * Собирает массив путей к фото из req (для create/update с multer).
 * Поддерживает existingPhotos (JSON) и req.files (drag-n-drop загрузка).
 */
function buildPhotoArray(req) {
  let photo = [];
  if (req.body?.existingPhotos) {
    try {
      const parsed = JSON.parse(req.body.existingPhotos);
      photo = Array.isArray(parsed) ? parsed : [];
    } catch {
      photo = [];
    }
  }
  if (req.files && req.files.length > 0) {
    const newPhoto = req.files
      .map((f) => {
        const name = (f.filename || f.path?.split(/[/\\]/).pop() || "")
          .replace(/^\/?api\/images\//, "")
          .replace(/^images\//, "");
        return name ? `/api/images/${name}` : null;
      })
      .filter(Boolean);
    photo = [...photo, ...newPhoto].filter((v, i, a) => a.indexOf(v) === i);
  }
  return photo.filter(
    (p) =>
      typeof p === "string" &&
      p.trim() !== "" &&
      (p.startsWith("/api/images/") || p.startsWith("/images/"))
  );
}

/**
 * Преобразует массив фото в строку для БД (STRING поле).
 */
function photoToString(photoArray) {
  if (!photoArray || photoArray.length === 0) return null;
  return photoArray.length === 1 ? photoArray[0] : JSON.stringify(photoArray);
}

module.exports = { buildPhotoArray, photoToString };
