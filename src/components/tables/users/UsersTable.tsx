import { FunctionComponent, useState } from 'react';
import { UsersTableEntry } from './UsersTableEntry';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableCreateRow } from './UsersTableCreateRow';

// TODO : remove (debugging only, replace with localstorage branch model)
export interface User {
  id: number;
  name: string;
  image: string;
}

interface UsersTableProps {
  users: User[];
}

export const DEFAULT_PROFILE_PICTURE =
  'https://docs.material-tailwind.com/img/face-2.jpg';

// TODO : remove (debugging only, replace with data from localstorage)
const usersDefault: User[] = [
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

export const UsersTable: FunctionComponent<UsersTableProps> = () => {
  const [users, setUsers] = useState<User[]>(usersDefault);

  const handleDeleteUser = () => {
    // TODO : remove from local storage
  };

  const handleAddUser = (user: User) => {
    // TODO : for debug purpose, will be replaced by localstorage function
    user.id = 42;
    setUsers((users) => [...users, user]);
  };

  const handleUpdateUser = async (
    id: number,
    image: File | null,
    name: string | null
  ) => {
    // TODO : debug purpose only (should use localstorage)
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        if (name != null) {
          user.name = name;
        }
        if (image != null) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64string = reader.result as string;
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

  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <UsersTableHeader />
        <tbody>
          {users?.length &&
            users.map((user) => {
              return (
                <UsersTableEntry
                  key={user.id}
                  user={user}
                  handleDeleteUser={handleDeleteUser}
                  handleUpdateUser={handleUpdateUser}
                />
              );
            })}
        </tbody>
        <UsersTableCreateRow handleAddUser={handleAddUser} />
      </table>
    </div>
  );
};
