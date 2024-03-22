import { User } from '../../model/User';

export type UserAction =
  | { type: 'ADD-USER'; payload: User }
  | { type: 'UPDATE-USER'; payload: number }
  | { type: 'DELETE-USER'; payload: number };
