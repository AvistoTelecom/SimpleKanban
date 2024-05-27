import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from 'react';
import { UserAction } from './user-action';
import { userReducer } from './user-reducer';
import { User } from '@model/user/user.type';
import { LocalStorage } from '@utils/localStorage.utils';

export type UserContextType = {
  userList: User[];
  dispatchUserList: Dispatch<UserAction>;
};

export const UserContext = createContext<UserContextType>({
  userList: [],
  dispatchUserList: () => {},
});

export const UserContextProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [userList, dispatchUserList] = useReducer(
    userReducer,
    LocalStorage.getUserList()
  );

  return (
    <UserContext.Provider value={{ userList, dispatchUserList }}>
      {children}
    </UserContext.Provider>
  );
};
