import * as express from 'express';

const router = express.Router();

import DB from '../../db';

router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);
    try {
        let friends = await DB.Friends.getFriends(id);
        res.json(friends);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    let friendDTO = req.body;
    try {
        let newFriend = await DB.Friends.insert(friendDTO);
        res.json(newFriend);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;