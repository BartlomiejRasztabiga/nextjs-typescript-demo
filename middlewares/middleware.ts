import nextConnect from 'next-connect';
import database from './database';
import passport from '../lib/passport';

const middleware = nextConnect();

console.log("after next connect")

middleware.use(database).use(passport.initialize());

console.log("after passport")

export default middleware;