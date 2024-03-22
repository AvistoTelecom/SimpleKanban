import { FunctionComponent } from 'react';
import { UsersTableEntry } from './UsersTableEntry';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableCreateRow } from './UsersTableCreateRow';
import { User } from '../../../model/User';
import { CreateUser } from '../../../model/CreateUser';

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
        <UsersTableHeader />
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
