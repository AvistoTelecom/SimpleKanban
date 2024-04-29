import { CreateUser } from '@model/user/create-user/create-user.type';
import { User } from '@model/user/user.type';

export type UserAction =
  | { type: 'ADD-USER'; payload: CreateUser }
  | { type: 'UPDATE-USER'; payload: User }
  | { type: 'DELETE-USER'; payload: string };
