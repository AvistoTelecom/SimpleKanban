import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
} from 'react';
import { User } from '../../model/User';
import { UserAction } from './UserAction';
import { userReducer } from './UserReducer';
import { LocalStorage } from '../../localStorage';

export type UserContextType = {
  userList: User[];
  dispatchUserList: Dispatch<UserAction>;
};

export const DEFAULT_PROFILE_PICTURE: string =
  'https://docs.material-tailwind.com/img/face-2.jpg';

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
