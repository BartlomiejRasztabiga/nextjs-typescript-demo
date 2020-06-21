import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import UserService from '../services/UserService'

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  let userService = new UserService()

  userService.getUserById(id)
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      let userService = new UserService()
      const user = await userService.getUserByEmail(email)
      if (user && (await bcrypt.compare(password, user.password))) done(null, user)
      else done(null, false, { message: 'Email or password is incorrect' })
    },
  ),
);

export default passport;