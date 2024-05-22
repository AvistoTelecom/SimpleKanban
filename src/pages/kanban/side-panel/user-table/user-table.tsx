import { FunctionComponent } from 'react';
import { UsersTableEntry } from './user-table-entry/user-table-entry';
import { User } from '@model/user/user.type';
import { CreateUser } from '@model/user/create-user/create-user.type';
import { UsersTableCreateRow } from './user-table-create-row/user-table-create-row';
import { Image } from '@model/image/image.type';
import { ImageCreate } from '@model/image/create-image/create-image.type';

type UsersTableProps = {
  userList: User[];
  imageList: Image[];
  onAddUser: (user: CreateUser) => void;
  onDeleteUser: (id: string) => void;
  onUpdateUser: (user: User) => void;
  onUpdateImage: (image: Image) => void;
  onAddImageToUser: (image: ImageCreate, userId: string) => void;
};

export const UsersTable: FunctionComponent<UsersTableProps> = ({
  userList,
  imageList,
  onAddUser,
  onDeleteUser,
  onUpdateUser,
  onUpdateImage,
  onAddImageToUser,
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
              image={imageList.find((image) => user.imageId === image.id)}
              onDeleteUser={onDeleteUser}
              onUpdateUser={onUpdateUser}
              onUpdateImage={onUpdateImage}
              onAddImageToUser={onAddImageToUser}
            />
          ))}
        </tbody>
        <UsersTableCreateRow onAddUser={onAddUser} />
      </table>
    </div>
  );
};
