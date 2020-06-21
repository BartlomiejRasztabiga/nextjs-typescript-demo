import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/api-helpers';
import UserService from '../../../services/UserService';
import { IUser } from '../../../models/User'

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    const userService = new UserService()
    const { password } = req.body;
    const email = normalizeEmail(req.body.email);
    if (!isEmail(email)) {
        res.status(400).send('The email you entered is invalid.');
        return;
    }
    if (!password) {
        res.status(400).send('Missing field(s)');
        return;
    }
    if ((await userService.getUserByEmail(email)) !== null) {
        res.status(403).send('The email has already been used.');
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createNew({ email: email, password: hashedPassword })

    req.logIn(user, (err) => {
        if (err) throw err;
        res.status(201).json({
            user: extractUser(req),
        });
    });
});

export default handler;