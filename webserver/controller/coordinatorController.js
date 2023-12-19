import bcrypt from "bcrypt";
import prisma from "../../database/prisma/index.js";
import { SALT_ROUNDS } from "../../utils/constants.js";
//#region Create Coordinator
const create = async (req, res) => {
  let { name, email, password } = req.body;
  password = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const emailInUse = await prisma.coordinator.findUnique({
      where: {
        email,
      },
    });
    if (emailInUse)
      return res.status(403).json({ message: "O e-mail já está em uso" });
    const coordinator = await prisma.coordinator.create({
      data: {
        name,
        email,
        password,
        hierarchy: 2,
      },
    });
    return res.status(201).json({ message: coordinator, error: false });
  } catch (error) {
    return res.status(500).json({ message: error, error: false });
  }
};
//#endregion
//#region Read Coordinator
const read = async (req, res) => {
  try {
    const coordinator = await prisma.coordinator.findMany();
    res.status(200).json({ message: coordinator, status: false });
  } catch (error) {
    res.status(200).json({ message: error, status: true });
  }
};

const readById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id Obrigatório" });
  try {
    const coordinator = await prisma.coordinator.findUnique({
      where: { id: parseInt(id) },
    });
    if (!coordinator)
      return res.status(404).json({ message: "Coordenador Não Encontrado" });
    return res.status(200).json({ message: coordinator, error: false });
  } catch (error) {
    return res.status(500).json({ message: error, error: true });
  }
};
//#endregion
//#region Update Coordinator
const update = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!id) res.status(400).json({ message: "Id obrigatório" });
  try {
    const doesCoordinatorExists = await prisma.coordinator.findUnique({
      where: { id: parseInt(id) },
    });
    if (!doesCoordinatorExists)
      res.status(404).json({ message: "Coordenador não existente" });
    const coordinator = await prisma.coordinator.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
      },
    });
    return res.status(200).json({ message: coordinator, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, error: true });
  }
};
//#endregion
//#region Delete Coordinator
const remove = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id Não Encontrado" });
  try {
    const doesCoordinatorFound = await prisma.coordinator.findUnique({
      where: { id: parseInt(id) },
    });
    if (!doesCoordinatorFound) {
      return res.status(404).json({ message: "Professor Não Encontrado" });
    }
    await prisma.coordinator.delete({ where: { id: parseInt(id) } });
    return res.status(204).json({ message: "Coordenador Removido" });
  } catch (error) {
    console.log(error);
  }
};
//#endregion
export { create, read, readById, update, remove };
