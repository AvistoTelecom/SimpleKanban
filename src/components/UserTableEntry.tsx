import { ChangeEvent, FunctionComponent } from 'react';
import { User } from './UserTable';
import { ImageInput } from './ImageInput';

interface UserEntryProps {
  user: User;
  isSelected: boolean;
  handleSelect: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
}

// TODO : manage image
export const UserTableEntry: FunctionComponent<UserEntryProps> = ({
  user,
  isSelected,
  handleSelect,
}) => {
  return (
    <tr>
      <td className="w-1/3">{user.name}</td>
      <td className="w-1/3">
        <ImageInput profilePicture={user.image} />
      </td>
      <td className="w-1/3">
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={isSelected}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSelect(e, user.id)
            }
          />
        </label>
      </td>
    </tr>
  );
};
