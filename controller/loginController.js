const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

//#region Add Logged User
exports.user = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email
    },
  });

  if (user === null) {
    return res.json({ msg: "Credenciais Inválidas." });
  }

  const match = await bcrypt.compare(password, user.password, null);

  if (!match) {
    return res.json({ msg: 'Credenciais Inválidas' });
  }

  return res.status(201).json({ msg: 'Ok' });
};

//#endregion

//#region Add Logged Teacher

exports.teacher = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.teacher.findFirst({
    where: {
      email
    },
  });

  if (user === null) {
    return res.json({ msg: "Credenciais Inválidas." });
  }

  const match = await bcrypt.compare(password, user.password, null);

  if (!match) {
    return res.json({ msg: 'Credenciais Inválidas' });
  }

  return res.status(200).json({ msg: 'Ok' });
};

//#endregion

//#region Add Logged Coordinator

exports.coordinator = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.coordinator.findFirst({
    where: {
      email
    },
  });

  if (user === null) {
    return res.json({ msg: "Credenciais Inválidas." });
  }

  const match = await bcrypt.compare(password, user.password, null);

  if (!match) {
    return res.json({ msg: 'Credenciais Inválidas' });
  }

  return res.status(200).json({ msg: 'Ok' });
};

//#endregion
