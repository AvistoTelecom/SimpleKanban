import { FunctionComponent } from 'react';
import { UsersTableEntry } from './UsersTableEntry';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableCreateRow } from './UsersTableCreateRow';
import { User } from '../../KanbanPage';

interface UsersTableProps {
  users: User[];
  handleAddUser: (user: User) => void;
  handleDeleteUser: (id: number) => void;
  handleUpdateUser: (
    id: number,
    name: string | null,
    image: File | null
  ) => void;
}

export const UsersTable: FunctionComponent<UsersTableProps> = ({
  users,
  handleAddUser,
  handleDeleteUser,
  handleUpdateUser,
}) => {
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
