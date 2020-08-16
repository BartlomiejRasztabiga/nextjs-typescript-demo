import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/UserService'

const BCRYPT_SALT_ROUNDS = 12;
const userService: UserService = UserService.getInstance()
const jwtSecret = process.env.JWT_SECRET

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true
    },
    (req, email, password, done) => {
      console.log(email)
      try {
        userService.getUserByEmail(email)
          .then(user => {
            if (user != null) {
              return done(null, false, { message: 'username already taken' });
            } else {
              bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                const additional_data = {
                  name: req.body.name
                };

                userService.createNew({ email: email, password: hashedPassword, name: additional_data.name }).then(user => {
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
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        userService.getUserByEmail(email)
          .then(user => {
            if (user === null) {
              return done(null, false, { message: 'wrong credentials' });
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                  return done(null, false, { message: 'wrong credentials' });
                }
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
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(
  'jwt',
  new JWTStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
    try {
      userService.getUserByEmail(jwt_payload.id)
        .then(user => {
          console.log(user)
          if (user) {
            // note the return removed with passport JWT - add this return for passport local
            done(null, user);
          } else {
            done(null, false);
          }
        });
    } catch (err) {
      done(err);
    }
  }),
);

export default passport;