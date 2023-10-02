const express = require("express");
const router = express.Router();

const coordinatorController = require("../controller/coordinatorController");

router.get("/", coordinatorController.read);
router.get("/:id", coordinatorController.readById);
router.post("/", coordinatorController.create);
router.put("/:id", coordinatorController.update);
router.delete("/:id", coordinatorController.delete);

module.exports = router;