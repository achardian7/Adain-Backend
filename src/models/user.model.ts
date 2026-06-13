import { Document, Schema, model } from 'mongoose';

import encrypt from '../utils/encrypt';

export type UserRole = 'admin' | 'member';

export const USER_MODEL_NAME = 'User';

export interface User extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

const UserSchema = new Schema<User>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      select: false,
    },
    role: {
      type: Schema.Types.String,
      required: true,
      enum: {
        values: ['admin', 'member'],
        message: '{VALUE} is not supported',
      },
      default: 'member',
    },
    profilePicture: {
      type: Schema.Types.String,
      default: 'user.jpg',
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

const UserModel = model<User>(USER_MODEL_NAME, UserSchema);

export default UserModel;
