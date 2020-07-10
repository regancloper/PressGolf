import * as express from 'express';
import * as passport from 'passport';

import usersRouter from './users';
import scoresRouter from './scores';
import coursesRouter from './courses';
import holesRouter from './holes';
import addFriendRouter from './addfriend';
import friendsRouter from './friends';


const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user, info) => {
        if (user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/users', usersRouter);
router.use('/scores', scoresRouter);
router.use('/courses', coursesRouter);
router.use('/holes', holesRouter);
router.use('/addfriend', addFriendRouter);
router.use('/friends', friendsRouter);



export default router;