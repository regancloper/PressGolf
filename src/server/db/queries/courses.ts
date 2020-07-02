import { Query } from '../index';

const getAll = async () => Query('SELECT * FROM courses WHERE teeName1 IS NOT NULL ORDER BY courses.clubname ASC');

const getTeeBox = async (clubname: string) => Query('SELECT * FROM courses WHERE clubname = ?', [clubname]);

const postBlog = async (title: string, content: string, authorid: number) => Query('INSERT INTO blogs(title, content, authorid) VALUES (?, ?, ?)', [title, content, authorid]);

const editBlog = async (title: string, content: string, id: number) => Query('UPDATE blogs SET title = ?, content = ? WHERE id =?', [title, content, id]);

const deleteBlog = async (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);

export default {
    getAll,
    getTeeBox,
    postBlog,
    editBlog,
    deleteBlog
}