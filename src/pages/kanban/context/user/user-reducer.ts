import { LocalStorage } from '../../../../utils/localStorage.utils';
import { CreateUser } from '../../../../types/create-user.type';
import { User } from '../../../../types/user.type';
import { UserAction } from './user-action';

const addUser = (newUser: CreateUser): User[] => {
  LocalStorage.addUser(newUser);
  return LocalStorage.getUserList();
};

const updateUser = (newUser: User): User[] => {
  LocalStorage.updateUser(newUser);
  return LocalStorage.getUserList();
};

const deleteUser = (userId: string): User[] => {
  LocalStorage.deleteUser(userId);
  return LocalStorage.getUserList();
};

export const userReducer = (_state: User[], action: UserAction): User[] => {
  switch (action.type) {
    case 'ADD-USER':
      return addUser(action.payload);
    case 'UPDATE-USER':
      return updateUser(action.payload);
    case 'DELETE-USER':
      return deleteUser(action.payload);
  }
};
