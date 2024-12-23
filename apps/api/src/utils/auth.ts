import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const hashPassword = (password: string) => hash(password, 10);

export const verifyPassword = (password: string, hash: string) =>
  compare(password, hash);

export const createToken = (userId: string) =>
  sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) =>
  verify(token, JWT_SECRET) as { userId: string };
