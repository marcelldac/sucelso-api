const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");
router.get("/", courseController.read);
router.get("/:id", courseController.readById);
router.post("/", courseController.create);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);

module.exports = router;
