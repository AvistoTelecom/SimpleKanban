import { CreateUser } from '@model/user/create-user/create-user.type';
import { UserAction } from './user-action';
import { User } from '@model/user/user.type';
import { LocalStorage } from '@utils/local-storage.utils';

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
