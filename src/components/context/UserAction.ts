import { CreateUser } from '../../model/CreateUser';
import { User } from '../../model/User';

export type UserAction =
  | { type: 'ADD-USER'; payload: CreateUser }
  | { type: 'UPDATE-USER'; payload: User }
  | { type: 'DELETE-USER'; payload: number };
