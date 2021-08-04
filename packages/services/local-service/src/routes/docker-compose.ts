import { Router } from 'express';
import { asyncMiddleware } from '../modules';
import * as controllers from '../controllers';

const router: Router = Router({ mergeParams: true });

router.post('/:action', asyncMiddleware(controllers.dockerCompose.action));

export default router;
