import { Router } from "express";

import { getMany, updateOne } from "./task.controller";

const router = Router();

router.route("/").get(getMany);
router.route("/:id").put(updateOne);

export default router;
