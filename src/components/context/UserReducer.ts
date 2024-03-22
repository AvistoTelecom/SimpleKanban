import { LocalStorage } from '../../localStorage';
import { CreateUser } from '../../model/CreateUser';
import { User } from '../../model/User';
import { UserAction } from './UserAction';

const addUser = (newUser: CreateUser): User[] => {
  LocalStorage.addUser(newUser);
  return LocalStorage.getUserList();
};

const updateUser = (newUser: User): User[] => {
  LocalStorage.updateUser(newUser);
  return LocalStorage.getUserList();
};

const deleteUser = (userId: number): User[] => {
  LocalStorage.deleteUser(userId);
  //todo mettre à jour les tickets
  return LocalStorage.getUserList();
};

export const userReducer = (action: UserAction) => {
  switch (action.type) {
    case 'ADD-USER':
      return addUser(action.payload);
    case 'UPDATE-USER':
      return updateUser(action.payload);
    case 'DELETE-USER':
      return deleteUser(action.payload);
  }
};
