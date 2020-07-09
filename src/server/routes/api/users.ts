import * as express from 'express';

const router = express.Router();

import DB from '../../db';

router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);
    try {
        let [user] = await DB.Users.getUser(id);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/:id', async (req, res) => {
    let id = Number(req.params.id);
    let index = req.body.index;
    try {
        let user = await DB.Users.updateIndex(id, index);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;