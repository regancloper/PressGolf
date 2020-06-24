import * as express from 'express';
import * as passport from 'passport';

import DB from '../../db';
import { CreateToken } from '../../utils/tokens';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: reqUser, res, next) => {
    try {
        await DB.Tokens.deleteExistingTokens(req.user.id);
        let token = await CreateToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

interface reqUser extends express.Request {
    user: {
        id: number;
        role: string;
    }
}


export default router;