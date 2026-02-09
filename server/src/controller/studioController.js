const StudioService = require("../services/studioService");
const formatResponse = require("../utils/formatResponse");
const { buildPhotoArray, photoToString } = require("../utils/photoHelper");

class StudioController {
  static async getAll(req, res) {
    try {
      const result = await StudioService.getAllStudios();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все студии",
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(401).json(
        formatResponse({
          statusCode: 401,
          message: "Не удалось получить все студии",
          error: error.message,
        }),
      );
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const studio = await StudioService.getOneStudio(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Получена одна студия",
          data: studio,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить одну студию",
          error: error.message,
        }),
      );
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await StudioService.deleteStudio(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Студия успешно удалёна",
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить студию",
          error: error.message,
        }),
      );
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { address, x, y } = req.body;
      const photoArray = buildPhotoArray(req);
      const photo = photoToString(photoArray);

      await StudioService.updateStudio(id, {
        address,
        photo,
        x: x != null ? Number(x) : undefined,
        y: y != null ? Number(y) : undefined,
      });

      const updated = await StudioService.getOneStudio(id);
      if (updated && photoArray.length) {
        updated.photo = photoArray;
      }
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Студия успешно обновлена",
          data: updated,
        }),
      );
    } catch (error) {
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось обновить студию",
          error: error.message,
        }),
      );
    }
  }

  static async create(req, res) {
    try {
      const { address, x, y } = req.body;
      const photoArray = buildPhotoArray(req);
      const photo = photoToString(photoArray);

      const result = await StudioService.createStudio({
        address,
        photo,
        x: x != null ? Number(x) : undefined,
        y: y != null ? Number(y) : undefined,
      });

      if (result && photoArray.length) {
        result.photo = photoArray;
      }
      res.status(201).json(
        formatResponse({
          statusCode: 201,
          message: "Студия успешно создана",
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Ошибка при создании студии",
          error: error.message,
        }),
      );
    }
  }
}

module.exports = StudioController;
