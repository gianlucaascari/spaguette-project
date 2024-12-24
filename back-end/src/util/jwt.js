import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { ENV } from '../config/env.js';

const getToken = (user) => jwt.sign({ id: user._id }, ENV.JWT_KEY)

const getUserFromJWT = async (token, db) => {
  if(!token) {
    return null
  }

  const tokenData = jwt.verify(token, ENV.JWT_KEY)

  if(!tokenData?.id){
    return null
  }

  const id = new ObjectId(tokenData.id)
  const user = await db.collection(ENV.DB_USERS_COL).findOne({ _id: id })
  return user
}

export { getToken, getUserFromJWT };