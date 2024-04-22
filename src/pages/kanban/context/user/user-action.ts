import { CreateUser } from '../../../../shared/types/create-user.type';
import { User } from '../../../../shared/types/user.type';

export type UserAction =
  | { type: 'ADD-USER'; payload: CreateUser }
  | { type: 'UPDATE-USER'; payload: User }
  | { type: 'DELETE-USER'; payload: string };
