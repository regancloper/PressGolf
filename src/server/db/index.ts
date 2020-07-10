import * as mysql from 'mysql';
import config from '../config';

// table query imports
import Users from './queries/users';
import Tokens from './queries/tokens';
import Scores from './queries/scores';
import Courses from './queries/courses';
import AddFriend from './queries/addfriend';
import Friends from './queries/friends';

// node - mysql connection pool
export const pool = mysql.createPool(config.mysql);

// resusable query helper method
export const Query = <T = any>(query: string, values?: any) => {

    const sql = mysql.format(query, values);

    return new Promise<T>((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });

};

// export for use, i.e. DB.Users...
export default {
    Users,
    Tokens,
    Scores,
    Courses,
    AddFriend,
    Friends
}