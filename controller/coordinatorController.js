const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
//#region Create Coordinator
exports.create = async (req, res) => {
  let { name, email, password } = req.body;
  const saltRounds = 8;
  password = await bcrypt.hash(password, saltRounds);
  const emailInUse = await prisma.coordinator.findUnique({
    where: {
      email,
    },
  });
  if (emailInUse) {
    return res.status(403).json({ message: "O e-mail já está em uso" });
  }
  try {
    const coordinator = await prisma.coordinator.create({
      data: {
        name,
        email,
        password,
        hierarchy: 2,
      },
    });
    return res.status(201).json(coordinator);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
//#endregion
//#region Read Coordinator
exports.read = async (req, res) => {
  const coordinator = await prisma.coordinator.findMany();
  res.status(200).json(coordinator);
};
exports.readById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id Obrigatório" });
  }
  const coordinator = await prisma.coordinator.findUnique({
    where: { id: parseInt(id) },
  });
  if (!coordinator) {
    return res.status(404).json({ message: "Coordenador Não Encontrado" });
  }
  return res.status(200).json(coordinator);
};
//#endregion
//#region Update Coordinator
exports.update = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Id obrigatório" });
  }
  const { name, email } = req.body;
  const doesCoordinatorExists = await prisma.coordinator.findUnique({
    where: { id: parseInt(id) },
  });
  if (!doesCoordinatorExists) {
    res.status(404).json({ message: "Coordenador não existente" });
  }
  const coordinator = await prisma.coordinator.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      email,
    },
  });
  return res.status(200).json(coordinator);
};
//#endregion
//#region Delete Coordinator
exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id Não Encontrado" });
  }
  const doesCoordinatorFound = await prisma.coordinator.findUnique({
    where: { id: parseInt(id) },
  });
  if (!doesCoordinatorFound) {
    return res.status(404).json({ message: "Professor Não Encontrado" });
  }
  await prisma.coordinator.delete({ where: { id: parseInt(id) } });
  return res.status(204).json({ message: "Coordenador Removido" });
};
//#endregion
