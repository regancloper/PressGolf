import { Query } from '../index';
import { TScore } from '../models';

const getAll = async (userid: number) => Query<TScore[]>('SELECT id, score, differential FROM scores WHERE userid = ?', [userid]);

const insert = (score: Score) => Query<{ insertId: number }>('INSERT INTO scores SET ?', score);


export default {
    getAll,
    insert
}

interface Score {
    userid: number;
    courseid: number;
    score: number;
    differential: number;
    teeName: string;
    teeGender: string;
}