import Router from 'express';

import HelloController  from '../controllers/hello.js';

const router = Router();

router.get("/",HelloController.hello);

export default router;