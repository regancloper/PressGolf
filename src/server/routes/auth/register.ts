import * as express from 'express';

import DB from '../../db';
import { HashPassword } from '../../utils/passwords';
import { CreateToken } from '../../utils/tokens';

const router = express.Router();

router.post('/', async (req: any, res, next) => {
    try {
        let user = req.body;
        if (!req.body.role) {
            req.body['role'] = 'admin';
        }
        user.password = HashPassword(req.body.password);
        let result: any = await DB.Users.insert(user);
        let token = await CreateToken({ userid: result.insertId });
        res.json({
            token,
            role: req.body.role,
            userid: result.insertId
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



export default router;