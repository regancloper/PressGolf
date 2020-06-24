import * as mysql from 'mysql';
import config from '../config';

// table query imports
import Users from './queries/users';
import Tokens from './queries/tokens';

// node - mysql connection pool
console.log(config.mysql);

export const pool = mysql.createPool(config.mysql);

// resusable query helper method
export const Query = <T = any>(query: string, values?: any) => {

    const sql = mysql.format(query, values);
    console.log(sql);

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
    Tokens
}