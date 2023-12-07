const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//#region Create Grade
exports.create = async (req, res) => {
  const { name, teacherId, courseId } = req.body;
  try {
    const grade = await prisma.grade.create({
      data: {
        name,
        teacherId,
        courseId,
      },
    });
    return res.status(201).json({ grade });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
//#endregion
//#region Read Grade
exports.read = async (req, res) => {
  const grade = await prisma.grade.findMany();
  res.status(200).json(grade);
};
exports.readById = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);
  if (!newId) {
    return res.status(400).json({ msg: "Id Obrigatório" });
  }
  const grade = await prisma.grade.findUnique({ where: { id: newId } });
  if (!grade) {
    return res.status(404).json({ msg: "Turma Não Encontrada" });
  }
  return res.status(200).json({ grade });
};
//#endregion
//#region Update Grade
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newId = parseInt(id);
  if (!newId) {
    res.status(400).json("Id obrigatório");
  }
  const gradeExists = await prisma.grade.findUnique({ where: { id: newId } });
  if (!gradeExists) {
    res.status(404).json("Turma não encontrada");
  }
  const grade = await prisma.grade.update({
    where: {
      id: newId,
    },
    data: {
      name,
    },
  });
  return res.status(200).json({ grade });
};
//#endregion
//#region Delete Grade
exports.delete = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);
  if (!newId) {
    return res.status(400).json({ msg: "Id Não Encontrado" });
  }
  const gradeChecker = await prisma.grade.findUnique({ where: { id: newId } });
  if (!gradeChecker) {
    return res.status(404).json({ msg: "Turma Não Encontrada" });
  }
  await prisma.grade.delete({ where: { id: newId } });
  return res.status(204).json({ msg: "Turma Removida" });
};
//#endregion
