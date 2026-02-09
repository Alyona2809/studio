const ProgramService = require("../services/programService");
const formatResponse = require("../utils/formatResponse");
const { buildPhotoArray, photoToString } = require("../utils/photoHelper");

class ProgramController {
  static async getAllPrograms(req, res) {
    try {
      const result = await ProgramService.getAllPrograms();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все программы",
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить все программы",
          error: error.message,
        }),
      );
    }
  }

  static async getOneProgram(req, res) {
    try {
      const { id } = req.params;
      const program = await ProgramService.getOneProgram(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Получена одна программа",
          data: program,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить одну программу",
          error: error.message,
        }),
      );
    }
  }

  static async deleteProgram(req, res) {
    try {
      const { id } = req.params;
      const result = await ProgramService.deleteProgram(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Программа успешно удалена",
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить программу",
          error: error.message,
        }),
      );
    }
  }

  static async updateProgram(req, res) {
    try {
      const { id } = req.params;
      const { age, programName, description } = req.body;
      const photoArray = buildPhotoArray(req);
      const photo = photoToString(photoArray);

      await ProgramService.updateProgram(id, {
        age,
        programName,
        description,
        photo,
      });

      const updated = await ProgramService.getOneProgram(id);
      if (updated && photoArray.length) {
        updated.photo = photoArray;
      }
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Программа успешно обновлена",
          data: updated,
        }),
      );
    } catch (error) {
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось обновить программу",
          error: error.message,
        }),
      );
    }
  }

  static async createProgram(req, res) {
    try {
      const { age, programName, description } = req.body;
      const photoArray = buildPhotoArray(req);
      const photo = photoToString(photoArray);

      const result = await ProgramService.createProgram({
        age,
        programName,
        description,
        photo,
      });

      if (result && photoArray.length) {
        result.photo = photoArray;
      }
      res.status(201).json(
        formatResponse({
          statusCode: 201,
          message: "Программа успешно создана",
          data: result,
        }),
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось создать программу",
          error: error.message,
        }),
      );
    }
  }
}

module.exports = ProgramController;
