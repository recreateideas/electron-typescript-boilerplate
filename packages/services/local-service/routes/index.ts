import { Router } from "express";
import { router as healthRouter } from "./health";

const router: Router = Router({ mergeParams: true });

router.use("/health", healthRouter);

export { router };
