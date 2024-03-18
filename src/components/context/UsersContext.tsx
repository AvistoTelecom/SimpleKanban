import { FunctionComponent, ReactNode, createContext, useState } from 'react';

export type User = {
  id: number;
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
  deleteUser: (id: number) => void;
  updateUser: (user: User) => void;
};

export const DEFAULT_PROFILE_PICTURE: string =
  'https://docs.material-tailwind.com/img/face-2.jpg';

const defaultUserList: User[] = [
  {
    id: 1,
    name: 'test',
    image: DEFAULT_PROFILE_PICTURE,
  },
  {
    id: 2,
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
    // Random only for debug (remove this comment and the random)
    const newUser = {
      id: Math.floor(Math.random() * 1500),
      name: user.name,
      image: user.image,
    };
    setUserList((userList) => [...userList, newUser]);
  };

  const deleteUser = (id: number) => {
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
