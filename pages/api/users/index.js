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

export default handler;