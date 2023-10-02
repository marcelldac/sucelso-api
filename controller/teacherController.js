const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

//#region Create Teacher

exports.create = async (req, res) => {
  let { name, email, password } = req.body;

  password = await bcrypt.hash(password, 8);

  emailInUse = await prisma.teacher.findUnique({
    where: {
      email
    },
    include: {
      pubs: true
    }
  });

  if (emailInUse != null) {
    return res.status(403).send();
  }

  try {
    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password,
        hierarchy: 1,
      },
    });
    return res.status(201).json({ msg: teacher });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

//#endregion

//#region Read Teacher

exports.read = async (req, res) => {
  const teachers = await prisma.teacher.findMany({
    include: {
      pubs: true,
      subject: true
    },
  });
  res.status(200).json({ teachers });
}

exports.readById = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Obrigatório" });
  };

  const teacher = await prisma.teacher.findUnique({ where: { id: newId } });

  if (!teacher) {
    return res.status(404).json({ msg: "Professor Não Encontrado" });
  };

  return res.status(200).json(teacher);
}

//#endregion

//#region Update Teacher

exports.update = async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body;

  const newId = parseInt(id);

  if (!newId) {
    res.status(400).json('Id obrigatório');
  };

  const teacherExists = await prisma.teacher.findUnique({ where: { id: newId } });

  if (!teacherExists) {
    res.status(404).json('Professor não existente')
  };

  const teacher = await prisma.teacher.update({
    where: {
      id: newId
    },
    data: {
      name,
      email,
      password
    },
  });

  return res.status(200).json(teacher);
}

//#endregion

//#region Delete Teacher

exports.delete = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Não Encontrado" });
  };

  const teacherChecker = await prisma.teacher.findUnique({ where: { id: newId } });

  if (!teacherChecker) {
    return res.status(404).json({ msg: 'Professor Não Encontrado' })
  };

  await prisma.teacher.delete({ where: { id: newId } });

  return res.status(204).json({ msg: 'Professor Removido' });
}

//#endregion