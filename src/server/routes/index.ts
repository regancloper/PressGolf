import * as express from 'express';

import authRouter from './auth';
import apiRouter from './api';
// import donateRouter from './donate';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', apiRouter);
// router.use('/donate', donateRouter);


export default router;