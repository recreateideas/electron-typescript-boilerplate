import { Router } from "express";
import { asyncMiddleware } from "../modules";
import * as controllers from "../controllers";

const router: Router = Router();

router.get("/", asyncMiddleware(controllers.health.healthCheck));

export { router };
