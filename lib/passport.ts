import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/UserService'

const BCRYPT_SALT_ROUNDS = 12;
const userService: UserService = UserService.getInstance()
const jwtSecret = process.env.JWT_SECRET

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((req, id, done) => {
//   userService.getUserById(id)
//     .then((user) => done(null, user));
// });

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        userService.getUserByEmail(email)
          .then(user => {
            if (user != null) {
              console.log('username already taken');
              return done(null, false, { message: 'username already taken' });
            } else {
              bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                userService.createNew({ email: email, password: hashedPassword }).then(user => {
                  console.log('user created');
                  // note the return needed with passport local - remove this return for passport JWT to work
                  return done(null, user);
                });
              });
            }
          });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        userService.getUserByEmail(email)
          .then(user => {
            if (user === null) {
              return done(null, false, { message: 'bad username' });
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                  console.log('passwords do not match');
                  return done(null, false, { message: 'passwords do not match' });
                }
                console.log('user found & authenticated');
                // note the return needed with passport local - remove this return for passport JWT
                return done(null, user);
              });
            }
          });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret,
};

passport.use(
  'jwt',
  new JWTStrategy(opts, (jwt_payload, done) => {
    try {
      userService.getUserByEmail(jwt_payload.id)
        .then(user => {
          if (user) {
            console.log('user found in db in passport');
            // note the return removed with passport JWT - add this return for passport local
            done(null, user);
          } else {
            console.log('user not found in db');
            done(null, false);
          }
        });
    } catch (err) {
      done(err);
    }
  }),
);

export default passport;