import { Query } from '../index';

const getFriends = async (id: number) => Query<Friend[]>(
    `SELECT f.user1, u.firstname, u.lastname, u.index
    FROM friends f
    JOIN users u ON f.user1 = u.id
    WHERE user2 = ?
    UNION ALL
    SELECT f.user2, u.firstname, u.lastname, u.index
    FROM friends f
    JOIN users u ON f.user2 = u.id
    WHERE user1 = ?`, [id, id]);


const insert = async (friendDTO: newFriend) => Query<{ insertId: number }>('INSERT INTO friends SET ?', friendDTO);

export default {
    insert,
    getFriends
}

interface newFriend {
    user1: number;
    user2: number;
}

interface Friend {
    id: number;
}