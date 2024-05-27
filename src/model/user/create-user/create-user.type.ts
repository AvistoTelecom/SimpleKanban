import { User } from '../user.type';

export type CreateUser = Omit<User, 'id'>;
