import { FunctionComponent } from 'react';
import { UsersTableEntry } from './UsersTableEntry';
import { UsersTableHeader } from './UsersTableHeader';
import { UsersTableCreateRow } from './UsersTableCreateRow';
import { CreateUser, User } from '../../context/UsersContext';

type UsersTableProps = {
  userList: User[];
  onAddUser: (user: CreateUser) => void;
  onDeleteUser: (id: number) => void;
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
          {userList.length > 0 &&
            userList.map((user: User) => {
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
