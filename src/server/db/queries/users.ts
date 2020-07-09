import { Query } from '../index';
import type { TUser } from '../models';

const getUser = async (id: number) => Query<TUser[]>('SELECT u.firstname, u.lastname, u.index FROM users u WHERE id = ?', [id]);

const findOneByEmail = async (email: string) => Query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);

const findOneById = async (id: number) => Query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);

const insert = async (user: IUser) => Query('INSERT INTO users SET ?', user);

const updateIndex = async (userid: number, index: number) => Query<{ affectedRows: number }>('UPDATE users SET `index` = ? WHERE id = ?', [index, userid]);

export default {
    getUser,
    findOneByEmail,
    findOneById,
    insert, 
    updateIndex
}

interface IUser {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role?: string;
}