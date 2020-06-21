import nextConnect from 'next-connect';
import database from './database';
import passport from '../lib/passport';

const middleware = nextConnect();

middleware.use(database).use(passport.initialize()).use(passport.session());

export default middleware;