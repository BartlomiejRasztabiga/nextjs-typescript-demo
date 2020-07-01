import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import UserService from '../../../services/UserService';
import jwt from 'jsonwebtoken';
import passport from '../../../lib/passport';

const handler = nextConnect();
const jwtSecret = process.env.JWT_SECRET;
const userService = UserService.getInstance();

handler.use(middleware);

handler.post((req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                userService.getUserByEmail(user.email)
                    .then(user => {
                        const token = jwt.sign({ id: user.email }, jwtSecret, { expiresIn: '1h' });
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'user found & logged in',
                        });
                    });
            });
        }
    })(req, res, next);
});

export default handler;