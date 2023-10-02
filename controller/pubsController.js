const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

//#region Create Publication

exports.create = async (req, res) => {
  const { text, teacherId } = req.body;

  try {
    const publication = await prisma.pubs.create({
      data: {
        text,
        teacherId
      },
    });
    return res.status(201).json({ msg: publication });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

//#endregion

//#region Read Publication

exports.read = async (req, res) => {
  const publication = await prisma.pubs.findMany();
  res.status(200).json({ publication });
}

exports.readById = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Obrigatório" });
  };

  const publication = await prisma.pubs.findUnique({ where: { id: newId } });

  if (!publication) {
    return res.status(404).json({ msg: "Publicação Não Encontrada" });
  };

  return res.status(200).json(publication);
}

//#endregion

//#region Update Publication

exports.update = async (req, res) => {
  const { id } = req.params
  const { text } = req.body;

  const newId = parseInt(id);

  if (!newId) {
    res.status(400).json('Id obrigatório');
  };

  const publicationExists = await prisma.pubs.findUnique({ where: { id: newId } });

  if (!publicationExists) {
    res.status(404).json('Publicação não encontrada');
  };

  const publication = await prisma.pubs.update({
    where: {
      id: newId
    },
    data: {
      text
    },
  });

  return res.status(200).json(publication);
}

//#endregion

//#region Delete Publication

exports.delete = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json({ msg: "Id Não Encontrado" });
  };

  const publicationChecker = await prisma.pubs.findUnique({ where: { id: newId } });

  if (!publicationChecker) {
    return res.status(404).json({ msg: 'Publicação Não Encontrada' })
  };

  await prisma.pubs.delete({ where: { id: newId } });

  return res.status(204).json({ msg: 'Publicação Removida' });
}

//#endregion