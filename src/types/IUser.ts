import { Model } from "mongoose";

interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
}

export interface IUserMethods {
  createJWT(): string;
  checkPassword(val: string): Promise<boolean>;
}

export type UserModel = Model<IUser, undefined, IUserMethods>;

export default IUser;
