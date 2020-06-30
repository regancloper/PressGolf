import { Query } from '../index';
import type { TUser } from '../models';

const getUser = async (id: number) => Query<TUser[]>('SELECT u.firstname, u.lastname, u.index FROM users u WHERE id = ?', [id]);

const findOneByEmail = async (email: string) => Query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);

const findOneById = async (id: number) => Query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);

const insert = async (user: IUser) => Query('INSERT INTO users SET ?', user);

export default {
    getUser,
    findOneByEmail,
    findOneById,
    insert
}

interface IUser {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role?: string;
}