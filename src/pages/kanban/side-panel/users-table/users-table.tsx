import { FunctionComponent } from 'react';
import { UsersTableEntry } from './users-table-entry';
import { UsersTableCreateRow } from './users-table-create-row';
import { User } from '../../../../shared/types/user.type';
import { CreateUser } from '../../../../shared/types/create-user.type';

type UsersTableProps = {
  userList: User[];
  onAddUser: (user: CreateUser) => void;
  onDeleteUser: (id: string) => void;
  onUpdateUser: (user: User) => void;
};

export const UsersTable: FunctionComponent<UsersTableProps> = ({
  userList,
  onAddUser,
  onDeleteUser,
  onUpdateUser,
}) => {
  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <thead>
          <tr>
            <th>Name</th>
            <th>Profile Picture</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user: User) => (
            <UsersTableEntry
              key={user.id}
              user={user}
              onDeleteUser={onDeleteUser}
              onUpdateUser={onUpdateUser}
            />
          ))}
        </tbody>
        <UsersTableCreateRow onAddUser={onAddUser} />
      </table>
    </div>
  );
};
