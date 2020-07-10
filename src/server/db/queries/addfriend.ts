import { Query } from '../index';

const getAll = async (userid: number) => Query<Player[]>(
    'SELECT id, firstname, lastname FROM users WHERE id NOT IN (?) ORDER BY lastname ASC', [userid]);

export default {
    getAll
}

interface Player {
    id: number;
    firstname: string;
	lastname: string;
}