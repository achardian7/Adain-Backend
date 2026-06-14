import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../lib/error';
import { generateToken } from '../lib/jwt';
import UserModel from '../models/user.model';
import { RequestUser } from '../types/auth';
import encrypt from '../utils/encrypt';
import {
  activationValidateSchema,
  loginValidateSchema,
  registerValidateSchema,
} from '../validators/auth';

export default class AuthController {
  public static async register(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    /**
     #swagger.tags = ['Auth']
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/RegisterRequest"
      }
     }
     */
    const { fullName, username, email, password } =
      registerValidateSchema.parse(req.body);

    const existingUser = await UserModel.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (existingUser)
      throw new ApiError(
        'Username or email already exist',
        409,
        'Authentication Error',
      );

    const user = await UserModel.create({
      fullName,
      username,
      email,
      password,
    });

    res.status(201).json({
      message: 'Successfully register',
      data: user.toJSON(),
    });
  }

  public static async login(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    /**
     #swagger.tags = ['Auth']
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/LoginRequest"
      }
     }
     */
    const { identifier, password } = loginValidateSchema.parse(req.body);

    const user = await UserModel.findOne({
      $or: [
        {
          username: identifier,
        },
        {
          email: identifier,
        },
      ],
      isActive: true,
    }).select('+password');

    if (!user)
      throw new ApiError('Invalid credentials', 401, 'Authentication Error');

    const isPasswordValid: boolean = encrypt(password) === user.password;

    if (!isPasswordValid)
      throw new ApiError('Invalid credentials', 401, 'Authentication Error');

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.status(200).json({
      message: 'Successfully logged in',
      data: token,
    });
  }

  public static async me(
    req: RequestUser,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    /**
     #swagger.tags = ['Auth']
     #swagger.security = [{
      "bearerAuth": []
     }]
     */
    const user = req.user;

    const result = await UserModel.findById(user?.id);

    res.status(200).json({
      message: 'Success get user profile',
      data: result,
    });
  }

  public static async activation(
    req: RequestUser,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    /**
     #swagger.tags = ['Auth']
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/ActivationRequest"
      }
     }
     */

    const { code } = activationValidateSchema.parse(req.body);

    const user = await UserModel.findOneAndUpdate(
      {
        activationCode: code,
      },
      {
        isActive: true,
      },
      {
        new: true,
      },
    );

    if (!user) throw new ApiError('Invalid activation code', 400);

    res.status(200).json({
      message: 'Success activate account',
      data: user.toJSON(),
    });
  }
}
