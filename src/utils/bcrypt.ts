import * as bcrypt from 'bcrypt';
import { bcryptRounds } from 'src/constants/auth';

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, bcryptRounds);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
