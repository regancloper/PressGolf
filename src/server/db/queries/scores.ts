import { Query } from '../index';
// import { TScore } from '../models';

const getAll = async (userid: number) => 
    Query<TableScore[]>(
        `SELECT 
            s.*,
            c.clubname
        FROM scores s
        JOIN courses c ON s.courseid = c.id
        WHERE s.userid = ?
        ORDER BY s.id DESC`, [userid]
    );

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

interface TableScore {
    id: number;
    userid: number;
    courseid: number;
    teeName: string;
    teeGender: string;
    score: number;
    differential: number;
    _created: string;
    clubname: string;
}