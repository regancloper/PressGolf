import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import { ComparePassword } from '../utils/passwords';
import DB from '../db';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    session: false
}, async (email, password, done) => {
    try {
        let [user]: any = await DB.Users.findOneByEmail(email);
        if (!user) {
            return done(null, false);
        }
        if (!ComparePassword(password, user.password)) {
            return done(null, false);
        }
        delete user.password;
        return done(null, user);
    } catch (e) {
        done(e);
    }
}));