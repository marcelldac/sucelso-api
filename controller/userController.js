const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

//#region Create User

exports.create = async (req, res) => {
  let { name, email, password, telefone, cpf } = req.body;

  password = await bcrypt.hash(password, 8);

  emailInUse = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (emailInUse != null) {
    return res.status(403).send();
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        telefone,
        cpf,
        hierarchy: 0
      },
    });
    return res.status(201).json({ msg: user });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

//#endregion

//#region Read User

exports.read = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ users });
}

exports.readById = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Obrigatório" });
  };

  const user = await prisma.user.findUnique({ where: { id: newId } });

  if (!user) {
    return res.status(404).json({ msg: "Usuário Não Encontrado" });
  };

  return res.status(200).json(user);
}

//#endregion

//#region Update User

exports.update = async (req, res) => {
  const { id } = req.params
  const { name, email, password, telefone, cpf } = req.body;

  const newId = parseInt(id);

  if (!newId) {
    res.status(400).json('Id obrigatório');
  };

  const userAlreadyExists = await prisma.user.findUnique({ where: { id: newId } });

  if (!userAlreadyExists) {
    res.status(404).json('Usuário não existente')
  };

  const user = await prisma.user.update({
    where: {
      id: newId
    },
    data: {
      name,
      email,
      password,
      telefone,
      cpf
    },
  });

  return res.status(200).json(user);
}

//#endregion

//#region Delete User

exports.delete = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Não Encontrado" });
  };

  const userChecker = await prisma.user.findUnique({ where: { id: newId } });

  if (!userChecker) {
    return res.status(404).json({ msg: 'Usuário Não Encontrado' })
  };

  await prisma.user.delete({ where: { id: newId } });

  return res.status(204).json({ msg: 'Usuário Removido' });
}

//#endregion