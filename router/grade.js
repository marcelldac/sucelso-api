import gradeController from "../controller/gradeController.js";
import { Router } from "express";

const router = Router();

router.get("/", gradeController.read);
router.get("/:id", gradeController.readById);
router.post("/", gradeController.create);
router.put("/:id", gradeController.update);
router.delete("/:id", gradeController.delete);

export default router;
