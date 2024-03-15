import { FunctionComponent } from 'react';
import { UsersTableEntry } from './UsersTableEntry';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableCreateRow } from './UsersTableCreateRow';
import { User } from '../../context/KanbanPageContext';

type UsersTableProps = {
  users: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onDeleteUser: (id: number) => void;
  onUpdateUser: (id: number, name: string | null, image: string | null) => void;
};

export const UsersTable: FunctionComponent<UsersTableProps> = ({
  users,
  onAddUser,
  onDeleteUser,
  onUpdateUser,
}) => {
  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <UsersTableHeader />
        <tbody>
          {users.length > 0 &&
            users.map((user: User) => {
              return (
                <UsersTableEntry
                  key={user.id}
                  user={user}
                  onDeleteUser={onDeleteUser}
                  onUpdateUser={onUpdateUser}
                />
              );
            })}
        </tbody>
        <UsersTableCreateRow onAddUser={onAddUser} />
      </table>
    </div>
  );
};
