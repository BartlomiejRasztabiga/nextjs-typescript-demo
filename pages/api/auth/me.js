import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import passport from '../../../lib/passport';
import UserService from '../../../services/UserService';

const handler = nextConnect();
const userService = UserService.getInstance();

handler.use(middleware);

handler.post((req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            console.log('user found in db from route');
            res.status(200).send({
                email: user.email,
                name: user.name
            });
        }
    })(req, res, next);
});

export default handler;