const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//#region Create course
exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const course = await prisma.course.create({
      data: {
        name,
      },
    });
    return res.status(201).json({ message: course });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
//#endregion
//#region Read course
exports.read = async (req, res) => {
  const course = await prisma.course.findMany({
    include: {
      grades: true,
      users: true,
    },
  });
  res.status(200).json(course);
};
exports.readById = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);
  if (!newId) {
    return res.status(400).json({ message: "Id Obrigatório" });
  }
  const course = await prisma.course.findUnique({
    where: {
      id: newId,
    },
    include: {
      grades: true,
    },
  });
  if (!course) {
    return res.status(404).json({ message: "Curso Não Encontrado" });
  }
  return res.status(200).json(course);
};
//#endregion
//#region Update course
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newId = parseInt(id);
  if (!newId) {
    res.status(400).json("Id obrigatório");
  }
  const courseExists = await prisma.course.findUnique({
    where: {
      id: newId,
    },
  });
  if (!courseExists) {
    res.status(404).json("Curso Não Encontrado");
  }
  const course = await prisma.course.update({
    where: {
      id: newId,
    },
    data: {
      name,
    },
  });
  return res.status(200).json(course);
};
//#endregion
//#region Delete course
exports.delete = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);
  if (!newId) {
    return res.status(400).json({ message: "Id Não Encontrado" });
  }
  const courseChecker = await prisma.course.findUnique({
    where: { id: newId },
  });
  if (!courseChecker) {
    return res.status(404).json({ message: "Curso Não Encontrado" });
  }
  await prisma.course.delete({ where: { id: newId } });
  return res.status(204).json({ message: "Curso Removido" });
};
//#endregion
