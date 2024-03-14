import { FunctionComponent, useState, MouseEvent } from 'react';
import { KanbanArea } from './KanbanArea';
import { SidePanel } from './SidePanel';
import { NavBar } from './NavBar';

export const DEFAULT_PROFILE_PICTURE: string =
  'https://docs.material-tailwind.com/img/face-2.jpg';

// TODO : remove (debugging only, replace with data from localstorage)
export interface Tag {
  name: string;
  color: string;
}

// TODO : remove (debugging only, replace with data from localstorage)
export interface User {
  id: number;
  name: string;
  image: string;
}

// TODO : remove (debugging only, replace with data from localstorage)
const defaultUsers: User[] = [
  {
    id: 1,
    name: 'test',
    image: DEFAULT_PROFILE_PICTURE,
  } as User,
  {
    id: 2,
    name: 'test2',
    image: DEFAULT_PROFILE_PICTURE,
  } as User,
];

// TODO : remove (debugging only, replace with data from localstorage)
const defaultTags: Tag[] = [
  {
    name: 'tag1',
    color: '#ff0000',
  } as Tag,
  {
    name: 'tag2',
    color: '#00ff00',
  } as Tag,
  {
    name: 'tag3',
    color: '#0000ff',
  } as Tag,
];

export const KanbanPage: FunctionComponent = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [contentID, setContentID] = useState<string>('');
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [tags, setTags] = useState<Tag[]>(defaultTags);

  const handleNavBar = (e: MouseEvent<HTMLButtonElement>) => {
    const id: string = e.currentTarget.value;
    if (contentID === '') {
      setSidePanelOpen(!sidePanelOpen);
      setContentID(id);
      return;
    }

    if (contentID === id) {
      setSidePanelOpen(!sidePanelOpen);
      setContentID('');
    } else {
      setContentID(id);
    }
  };

  const handleAddUser = (user: User) => {
    // TODO : Not implemented (need localstorage, only debug version)
    user.id = 42;
    setUsers((users: User[]): User[] => [...users, user]);
  };

  const handleDeleteUser = (id: number) => {
    // TODO : Not implemented (need localstorage, only debug version)
    setUsers((users) => [...users.filter((user) => user.id !== id)]);
  };

  const handleUpdateUser = (
    id: number,
    name: string | null,
    image: File | null
  ) => {
    // TODO : Not implemented (need localstorage, only debug version)
    const updatedUsers: User[] = users.map((user: User) => {
      if (user.id === id) {
        if (name != null) {
          user.name = name;
        }
        if (image != null) {
          const reader: FileReader = new FileReader();
          reader.onloadend = () => {
            const base64string: string = reader.result as string;
            user.image = base64string;
            // Triggering the update when image is done loading
            setUsers(users);
          };
          reader.readAsDataURL(image);
        }
        return user;
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleAddTag = (newTag: Tag) => {
    // TODO : Not implemented (need localstorage, only debug version)
    const nameAlreadyExsists: boolean = tags.some(
      (tag: Tag) => newTag.name === tag.name
    );
    if (nameAlreadyExsists) {
      return;
    }
    setTags((tags) => [...tags, newTag]);
  };

  const handleDeleteTag = (name: string) => {
    // TODO : Not implemented (need localstorage, only debug version)
    setTags((tags: Tag[]): Tag[] => [
      ...tags.filter((tag) => tag.name !== name),
    ]);
  };

  const handleUpdateTag = (
    name: string,
    newName: string | null,
    color: string | null
  ) => {
    // TODO : Not implemented (need localstorage, only debug version)
    const nameAlreadyExsists: boolean = tags.some(
      (tag: Tag) => tag.name === newName
    );
    if (nameAlreadyExsists) {
      return;
    }

    const updatedTags: Tag[] = tags.map((tag: Tag) => {
      if (tag.name === name) {
        if (newName !== null) {
          tag.name = newName;
        }

        if (color !== null) {
          tag.color = color;
        }
      }
      return tag;
    });
    setTags(updatedTags);
  };

  return (
    <>
      <NavBar handleNavBar={handleNavBar} />
      <main className="flex-grow h-96 flex w-full space-x-2 p-2 bg-base-300">
        <KanbanArea />
        {sidePanelOpen && (
          <SidePanel
            users={users}
            tags={tags}
            handleAddTag={handleAddTag}
            handleDeleteTag={handleDeleteTag}
            handleUpdateTag={handleUpdateTag}
            handleAddUser={handleAddUser}
            handleDeleteUser={handleDeleteUser}
            handleUpdateUser={handleUpdateUser}
            content={contentID}
          />
        )}
      </main>
    </>
  );
};
