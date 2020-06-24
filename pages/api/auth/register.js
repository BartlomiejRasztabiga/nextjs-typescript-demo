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
        const data = {
          email: req.body.email,
          name: req.body.name
        };

        userService.updateUserByEmail(data.email, data)
          .then(() => {
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
          });
      });
    }
  })(req, res, next);
});

export default handler;