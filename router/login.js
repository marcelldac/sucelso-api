import { user, coordinator, teacher } from "../controller/loginController.js";
import { Router } from "express";

const router = Router();

router.post("/user", user);
router.post("/teacher", teacher);
router.post("/coordinator", coordinator);

export default router;
