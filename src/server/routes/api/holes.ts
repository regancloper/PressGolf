import * as express from 'express';

const router = express.Router();

import DB from '../../db';

router.get('/:id', async (req, res) => {
    let courseid = Number(req.params.id);
    try {
        let [holes] = await DB.Courses.getHoles(courseid);
        res.json(holes);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;