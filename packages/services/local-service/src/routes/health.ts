import { Router } from 'express';
import { asyncMiddleware } from '../modules';
import * as controllers from '../controllers';

const router: Router = Router({ mergeParams: true });

router.get('/', asyncMiddleware(controllers.health.healthCheck));

export default router;
