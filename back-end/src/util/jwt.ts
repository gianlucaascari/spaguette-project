import jwt from 'jsonwebtoken';
import { Db, ObjectId } from 'mongodb';

import { ENV } from '../config/env.js';
import { DbUser } from 'types/User.js';

const getToken = (user: DbUser): string => {
  if (!ENV.JWT_KEY) throw new Error('JWT_KEY is not defined');
  return jwt.sign({ id: user._id }, ENV.JWT_KEY);
}

const getUserFromJWT = async (token: string, db: Db): Promise<DbUser | undefined> => {
  if (!ENV.JWT_KEY) throw new Error('JWT_KEY is not defined');
  if(!token) return undefined

  const tokenData = jwt.verify(token, ENV.JWT_KEY);

  if (typeof tokenData === 'string' || !tokenData.id) return undefined;

  const id = new ObjectId(tokenData.id)
  const user = await db.collection(ENV.DB_USERS_COL).findOne({ _id: id }) as DbUser | null
  if(!user) return undefined
  return user
}

export { getToken, getUserFromJWT };