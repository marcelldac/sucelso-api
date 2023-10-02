const express = require("express");
const router = express.Router();

const gradeController = require("../controller/gradeController");

router.get("/", gradeController.read);
router.get("/:id", gradeController.readById);
router.post("/", gradeController.create);
router.put("/:id", gradeController.update);
router.delete("/:id", gradeController.delete);

module.exports = router;