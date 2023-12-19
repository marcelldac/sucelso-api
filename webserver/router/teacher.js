import {
  create,
  read,
  readById,
  update,
  remove,
} from "../controller/teacherController.js";
import { Router } from "express";

const router = Router();

router.get("/", read);
router.get("/:id", readById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
