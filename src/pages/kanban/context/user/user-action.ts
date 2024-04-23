import { CreateUser } from '../../../../types/create-user.type';
import { User } from '../../../../types/user.type';

export type UserAction =
  | { type: 'ADD-USER'; payload: CreateUser }
  | { type: 'UPDATE-USER'; payload: User }
  | { type: 'DELETE-USER'; payload: string };
