import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import passport from '../../../lib/passport';
import { extractUser } from '../../../lib/api-helpers';
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
        };
        userService.updateUserByEmail(data.username, data)
          .then(() => {
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
          });
      });
    }
  })(req, res, next);
});

// handler.delete((req, res) => {
//   req.logOut();
//   res.status(204).end();
// });

export default handler;