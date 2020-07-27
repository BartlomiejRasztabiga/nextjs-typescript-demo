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
    console.log('test')
    passport.authenticate('login', { session: false }, (err, user, info) => {
        console.log(err, user, info)
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            if (!user) {
                res.status(401).json(info)
                return
            }

            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                if (err) {
                    console.log(err)
                    res.status(401).json(err)
                    return next(err)
                }
                if (!user) {
                    console.log(user)
                    res.status(401).json(err)
                    return
                }
                console.log('i ma here')
                userService.getUserByEmail(user.email)
                    .then(user => {
                        console.log(user)
                        const token = jwt.sign({ id: user.email }, jwtSecret, { expiresIn: '1h' });
                        res.status(200).send({
                            access_token: token
                        });
                    });
            });
        }
    })(req, res, next);
});

export default handler;