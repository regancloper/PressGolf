import * as express from 'express';

const router = express.Router();

import DB from '../../db';

router.get('/', async (req, res) => {
    try {
        let courses = await DB.Courses.getAll();
        res.json(courses);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:coursename', async (req, res) => {
    let coursename = req.params.coursename;
    try {
        let courses = await DB.Courses.getTeeBox(coursename);
        res.json(courses);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;