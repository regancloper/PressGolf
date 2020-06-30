import * as express from 'express';
// import { Request } from 'express';

import DB from '../../db';

const router = express.Router();

// const isAdmin: RequestHandler = (req: ReqUser, res, next) => {
//     if (!req.user || (req.user && req.user.role !== 'admin')) {
//         return res.sendStatus(401);
//     } else {
//         return next();
//     }
// }

router.get('/:userid', async (req, res, next) => {
    let userid = parseInt(req.params.userid);
    try {
        let scores = await DB.Scores.getAll(userid);
        res.send(scores);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// router.get('/:id', async (req, res, next) => {
//     let id = parseInt(req.params.id);
//     try {
//         let blog = await DB.Courses.getSingleBlog(id);
//         res.send(blog);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

router.post('/', async (req, res) => {
    const scoreDTO = req.body;
    try {
        const { insertId: scoreid } = await DB.Scores.insert(scoreDTO);
        res.json({ scoreid, msg: 'score added!' });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// router.put('/:id', isAdmin, async (req, res) => {
//     let id = parseInt(req.params.id);
//     let title = req.body.title;
//     let content = req.body.content;
//     try {
//         await DB.Blogs.editBlog(title, content, id);
//         res.json({ message: 'Blogged!'});
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });


// router.delete('/:id', isAdmin, async (req, res) => {
//     let id = parseInt(req.params.id);
//     try {
//         await DB.Blogs.deleteBlog(id);
//         res.json({ message: 'Blogged!'});
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

// interface ReqUser extends Request {
//     user: {
//         role: string;
//     };
// }


export default router;