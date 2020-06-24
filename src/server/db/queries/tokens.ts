import { Query } from '../index';

const findOne = async (id: number, token: string) => Query('SELECT * FROM accesstokens WHERE id = ? AND token = ?', [id, token]);

const insert = async (userid: number) => Query('INSERT INTO accesstokens (userid) VALUES (?)', [userid]);

const update = async (id: number, token: string) => Query('UPDATE accesstokens SET token = ? WHERE id = ?', [token, id]);

const deleteExistingTokens = async (userid: number) => Query('DELETE FROM accesstokens WHERE userid = ?', [userid]);

export default {
    findOne,
    insert,
    update,
    deleteExistingTokens
}