import { FunctionComponent, useState } from 'react';
import { UserTableEntry } from './UserTableEntry';
import { UserTableHeader } from './UserTableHeader';
import { UserTableCreateRow } from './UserTableCreateRow';

export interface User {
  id: number;
  name: string;
  image: string;
}

interface UserTableProps {
  users: User[];
}

export const DEFAULT_PROFILE_PICTURE =
  'https://docs.material-tailwind.com/img/face-2.jpg';

// TODO : this about how to change this
const usersDefault = [
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

export const UserTable: FunctionComponent<UserTableProps> = () => {
  const [users, setUsers] = useState<User[]>(usersDefault);

  const handleDeleteUser = () => {
    // TODO : remove from local storage
  };

  const handleAddUser = (user: User) => {
    // TODO : for debbug purpose, will be replaced by localstorage function
    user.id = 42;
    setUsers((users) => [...users, user]);
  };

  const handleUpdateUser = async (
    id: number,
    image: File | null,
    name: string | null
  ) => {
    // TODO : debug purpose only (should be remove)
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
        <UserTableHeader />
        <tbody>
          {users?.length &&
            users.map((user) => {
              return (
                <UserTableEntry
                  key={user.id}
                  user={user}
                  handleDeleteUser={handleDeleteUser}
                  handleUpdateUser={handleUpdateUser}
                />
              );
            })}
        </tbody>
        <UserTableCreateRow handleAddUser={handleAddUser} />
      </table>
    </div>
  );
};
