import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import passport from '../../../lib/passport';
import UserService from '../../../services/UserService';

const handler = nextConnect();
const userService = UserService.getInstance();

handler.use(middleware);

handler.post((req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    console.log(err, user, info)
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        if (!err) {
          res.status(200).send({ message: 'user created' });
        } else {
          console.error(err)
          res.status(500).send(err)
        }
      });
    }
  })(req, res, next);
});

export default handler;