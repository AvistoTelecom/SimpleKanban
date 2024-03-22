import { FunctionComponent, ReactNode, createContext, useState } from 'react';

export type User = {
  id: string;
  name: string;
  image: string;
};

export type CreateUser = {
  name: string;
  image: string;
};

export type UsersContextType = {
  userList: User[];
  addUser: (user: CreateUser) => void;
  deleteUser: (id: string) => void;
  updateUser: (user: User) => void;
};

export const DEFAULT_PROFILE_PICTURE: string =
  'https://docs.material-tailwind.com/img/face-2.jpg';

const defaultUserList: User[] = [
  {
    id: '1',
    name: 'test',
    image: DEFAULT_PROFILE_PICTURE,
  },
  {
    id: '2',
    name: 'test2',
    image: DEFAULT_PROFILE_PICTURE,
  },
];

export const UsersContext = createContext<UsersContextType>({
  userList: [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
});

const UsersContextProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [userList, setUserList] = useState<User[]>(defaultUserList);

  const addUser = (user: CreateUser) => {
    // Will be done in "useReducer PR"
    const newUser = {
      id: '1',
      name: user.name,
      image: user.image,
    };
    setUserList((userList) => [...userList, newUser]);
  };

  const deleteUser = (id: string) => {
    setUserList((userList) => userList.filter((user) => user.id !== id));
  };

  const updateUser = (updatedUser: User) => {
    const userIndex = userList.findIndex((user) => user.id === updatedUser.id);
    if (userIndex === -1) {
      return;
    }

    setUserList((userList) => userList.with(userIndex, updatedUser));
  };

  return (
    <UsersContext.Provider
      value={{
        userList,
        addUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
