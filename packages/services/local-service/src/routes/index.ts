import { Router } from 'express';
import health from './health';
import dockerCompose from './docker-compose';

const router: Router = Router({ mergeParams: true });

router.use('/health', health);
router.use('/docker-compose', dockerCompose);

export { router };
