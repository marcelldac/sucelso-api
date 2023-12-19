import bcrypt from "bcrypt";
import prisma from "../../database/prisma/index.js";

//#region Add Logged User
const user = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user === null) {
    return res.json({ msg: "Credenciais Inválidas." });
  }
  const match = await bcrypt.compare(password, user.password, null);
  if (!match) {
    return res.json({ msg: "Credenciais Inválidas" });
  }
  return res.status(201).json({ msg: "Ok" });
};
//#endregion
//#region Add Logged Teacher
const teacher = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.teacher.findFirst({
    where: {
      email,
    },
  });
  if (user === null) {
    return res.json({ msg: "Credenciais Inválidas." });
  }
  const match = await bcrypt.compare(password, user.password, null);
  if (!match) {
    return res.json({ msg: "Credenciais Inválidas" });
  }
  return res.status(200).json({ msg: "Ok" });
};
//#endregion
//#region Add Logged Coordinator
const coordinator = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.coordinator.findFirst({
    where: {
      email,
    },
  });
  if (user === null) {
    return res.json({ msg: "Credenciais Inválidas." });
  }
  const match = await bcrypt.compare(password, user.password, null);
  if (!match) {
    return res.json({ msg: "Credenciais Inválidas" });
  }
  return res.status(200).json({ msg: "Ok" });
};
//#endregion

export { coordinator, teacher, user };
