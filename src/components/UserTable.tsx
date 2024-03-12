import { ChangeEvent, FunctionComponent, useState } from 'react';
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
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>(usersDefault);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const value = e.target.checked;
    if (value) {
      setSelectedItems((selectedItems) => [...selectedItems, id]);
    } else {
      setSelectedItems((selectedItems) =>
        selectedItems.filter((item) => item !== id)
      );
    }
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const value: boolean = e.target.checked;
    if (value) {
      setSelectedItems(() => users.map((user) => user.id));
    } else {
      setSelectedItems(() => []);
    }
  };

  const handleDelete = () => {
    // TODO : remove from local storage
    setSelectedItems(() => []);
  };

  const handleAddUser = (user: User) => {
    // TODO : for debbug purpose, will be replaced by localstorage function
    user.id = 42;
    setUsers((users) => [...users, user]);
  };

  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <UserTableHeader
          handleDelete={handleDelete}
          handleSelectAll={handleSelectAll}
          allSelected={selectedItems.length === users.length}
          selectedItemsCounter={selectedItems.length}
        />
        <tbody>
          {users?.length &&
            users.map((user) => {
              return (
                <UserTableEntry
                  key={user.id}
                  user={user}
                  isSelected={selectedItems.includes(user.id)}
                  handleSelect={handleSelect}
                />
              );
            })}
        </tbody>
        <UserTableCreateRow handleAddUser={handleAddUser} />
      </table>
    </div>
  );
};
