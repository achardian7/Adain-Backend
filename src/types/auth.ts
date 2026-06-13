import { Request } from 'express';

import z from 'zod';

import { UserPayload } from '../lib/jwt';
import {
  loginValidateSchema,
  registerValidateSchema,
} from '../validators/auth';

export type RegisterDto = z.infer<typeof registerValidateSchema>;
export type LoginDto = z.infer<typeof loginValidateSchema>;

export interface RequestUser extends Request {
  user?: UserPayload;
}
