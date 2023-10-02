const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//#region Create Subject

exports.create = async (req, res) => {
  let { name, teacherId } = req.body;

  try {
    const subject = await prisma.subject.create({
      data: {
        name,
        teacherId
      },
    });
    return res.status(201).json({ msg: subject });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

//#endregion

//#region Read Subject

exports.read = async (req, res) => {
  const subjects = await prisma.subject.findMany();
  res.status(200).json({ subjects });
}

exports.readById = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Obrigatório" });
  };

  const subject = await prisma.subject.findUnique({ where: { id: newId } });

  if (!subject) {
    return res.status(404).json({ msg: "Matéria Não Encontrada" });
  };

  return res.status(200).json(subject);
}

//#endregion

//#region Update Subject

exports.update = async (req, res) => {
  const { id } = req.params
  const { name, teacher } = req.body;

  const newId = parseInt(id);

  if (!newId) {
    res.status(400).json('Id obrigatório');
  };

  const subjectExists = await prisma.subject.findUnique({ where: { id: newId } });

  if (!subjectExists) {
    res.status(404).json('Matéria não existente')
  };

  const subject = await prisma.subject.update({
    where: {
      id: newId
    },
    data: {
      name,
      teacher
    },
  });

  return res.status(200).json(subject);
}

//#endregion

//#region Delete User

exports.delete = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Não Encontrado" });
  };

  const subjectChecker = await prisma.subject.findUnique({ where: { id: newId } });

  if (!subjectChecker) {
    return res.status(404).json({ msg: 'Matéria Não Encontrada' })
  };

  await prisma.subject.delete({ where: { id: newId } });

  return res.status(204).json({ msg: 'Matéria Removida' });
}

//#endregion