import * as express from 'express';

const router = express.Router();

import DB from '../../db';

router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);
    try {
        let allUsers = await DB.AddFriend.getAll(id);
        res.json(allUsers);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;