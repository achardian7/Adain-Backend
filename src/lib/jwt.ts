import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import config from '../config';
import { UserRole } from '../models/user.model';

export type UserPayload = {
  id: Types.ObjectId;
  role: UserRole;
};

export const generateToken = (payload: UserPayload): string => {
  const token = jwt.sign(payload, config.SECRET, {
    expiresIn: config.EXPIRES_IN,
  });

  return token;
};

export const getUserPayload = (accessToken: string): UserPayload => {
  const payload = jwt.verify(accessToken, config.SECRET);

  return payload as UserPayload;
};
