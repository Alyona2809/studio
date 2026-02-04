const TeacherService = require("../services/teacherService");
const { formatResponse } = require("../utils/formatResponse");

class TeacherController {
  static async getAll(req, res) {
    try {
      const result = await TeacherService.getAllTeachers();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все преподаватели",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(401).json(
        formatResponse({
          statusCode: 401,
          message: "Не удалось получить все преподаватели",
          error: error.message,
        })
      );
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await TeacherService.getOneTeacher(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Получен один преподаватель",
          data: user,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить один преподаватель",
          error: error.message,
        })
      );
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await TeacherService.deleteTeacher(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Преподаватель успешно удалён",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить преподаватель",
          error: error.message,
        })
      );
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { content, userId, tutorId } = req.body;
      const result = await TeacherService.updateTeacher(id, {
        content,
        userId,
        tutorId,
      });
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Преподаватель успешно обновлён",
          data: result,
        })
      );
    } catch (error) {
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось обновить преподаватель",
          error: error.message,
        })
      );
    }
  }

  static async create(req, res) {
    try {
      const { tutorId, content } = req.body;
      const userId = res.locals.user.id;

      const result = await TeacherService.createTeacher({
        content,
        userId,
        tutorId,
      });

      return res.status(201).json({
        statusCode: 201,
        message: "Преподаватель успешно создан",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Ошибка при создании преподавателя",
        error: error.message,
      });
    }
  }

  static async reviewByTutor(req, res) {
    try {
      const { programId } = req.params;
      const result = await TeacherService.getAllTeacherByProgram(programId);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все преподаватели к одной программе",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить все преподаватели к одной программе",
          error: "Не удалось получить все преподаватели к одной программе",
        })
      );
    }
  }
}

module.exports = TeacherController;
