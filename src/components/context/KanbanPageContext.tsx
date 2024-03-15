import { FunctionComponent, ReactNode, createContext, useState } from 'react';

type UserUpdateData = {
  name: string | null;
  image: string | null;
};

type TagUpdateData = {
  name: string | null;
  color: string | null;
};

export type Tag = {
  name: string;
  color: string;
};

export type User = {
  id: number;
  name: string;
  image: string;
};

export const DEFAULT_PROFILE_PICTURE: string =
  'https://docs.material-tailwind.com/img/face-2.jpg';

export const DEFAULT_TAG_COLOR: string = '#000000';

export type KabanPageContextType = {
  userList: User[];
  tagList: Tag[];
  addTag: (tag: Tag) => void;
  deleteTag: (name: string) => void;
  updateTag: (name: string, tag: TagUpdateData) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, user: UserUpdateData) => void;
};

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

const defaultTagList: Tag[] = [
  {
    name: 'tag1',
    color: '#ff0000',
  },
  {
    name: 'tag2',
    color: '#00ff00',
  },
  {
    name: 'tag3',
    color: '#0000ff',
  },
];

export const KanbanPageContext = createContext<KabanPageContextType>({
  tagList: [],
  userList: [],
  addTag: () => {},
  addUser: () => {},
  updateTag: () => {},
  updateUser: () => {},
  deleteTag: () => {},
  deleteUser: () => {},
});

const KanbanPageProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [userList, setUserList] = useState<User[]>(defaultUserList);
  const [tagList, setTagList] = useState<Tag[]>(defaultTagList);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { id: 42, name: user.name, image: user.image };
    setUserList((userList) => [...userList, newUser]);
  };

  const addTag = (newTag: Tag) => {
    const nameAlreadyExists = tagList.some((tag) => tag.name === newTag.name);
    if (nameAlreadyExists) {
      return;
    }
    setTagList((tagList) => [...tagList, newTag]);
  };

  const deleteUser = (id: number) => {
    setUserList((userList) => userList.filter((user) => user.id === id));
  };

  const deleteTag = (name: string) => {
    setTagList((tagList) => tagList.filter((tag) => tag.name === name));
  };

  const updateUser = (id: number, updatedUser: UserUpdateData) => {
    const userIndex = userList.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return;
    }

    const replacingUser = {
      id: userList[userIndex].id,
      name: userList[userIndex].name,
      image: userList[userIndex].image,
    };

    if (updatedUser.name !== null) {
      replacingUser.name = updatedUser.name;
    }

    if (updatedUser.image !== null) {
      replacingUser.image = updatedUser.image;
    }

    setUserList((userList) => userList.with(userIndex, replacingUser));
  };

  const updateTag = (name: string, updatedTag: TagUpdateData) => {
    const tagIndex = tagList.findIndex((tag) => tag.name === name);
    if (tagIndex === -1) {
      return;
    }

    const replacingTag = {
      name: tagList[tagIndex].name,
      color: tagList[tagIndex].color,
    };
    if (updatedTag.name !== null) {
      replacingTag.name = updatedTag.name;
    }

    if (updatedTag.color !== null) {
      replacingTag.color = updatedTag.color;
    }

    setTagList((tagList) => tagList.with(tagIndex, replacingTag));
  };

  return (
    <KanbanPageContext.Provider
      value={{
        userList,
        tagList,
        addTag,
        addUser,
        deleteTag,
        deleteUser,
        updateTag,
        updateUser,
      }}
    >
      {children}
    </KanbanPageContext.Provider>
  );
};

export default KanbanPageProvider;
