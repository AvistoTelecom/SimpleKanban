import { ChangeEvent, KeyboardEvent, FunctionComponent, useState } from 'react';
import { ImageInput } from './ImageInput';
import { TrashIcon } from '../../icons/TrashIcon';
import { User } from '../../../model/User';

type UserEntryProps = {
  user: User;
  onDeleteUser: (id: string) => void;
  onUpdateUser: (user: User) => void;
};

export const UsersTableEntry: FunctionComponent<UserEntryProps> = ({
  user,
  onDeleteUser,
  onUpdateUser,
}) => {
  const [name, setName] = useState<string>(user.name);
  const [nameError, setNameError] = useState<string>('');

  const isValidUserName = (newName: string): boolean => {
    if (newName.length === 0) {
      setNameError("Name shouldn't be empty...");
      return false;
    }
    setNameError('');
    return true;
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newName: string = event.target.value;
    isValidUserName(newName);
    setName(newName);
  };

  const onSubmit = () => {
    if (!isValidUserName(name)) {
      return;
    }
    const newUser: User = { id: user.id, name: name, image: user.image };
    onUpdateUser(newUser);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      onSubmit();
    }
  };

  const onChangeImage = (image: string) => {
    const newUser: User = { id: user.id, name: user.name, image };
    onUpdateUser(newUser);
  };

  return (
    <tr>
      <td className="py-6">
        <label className="form-control w-full max-w-xs relative">
          <input
            type="text"
            placeholder="Name..."
            className={
              'input input-sm w-full max-w-xs' +
              (name.length === 0 ? ' input-error' : '')
            }
            value={name}
            onChange={onChangeName}
            onBlur={onSubmit}
            onKeyDown={onKeyPress}
          />
          <span className="label-text-alt text-error absolute -bottom-5 left-1 italic">
            {nameError}
          </span>
        </label>
      </td>
      <td>
        <ImageInput image={user.image} onChange={onChangeImage} />
      </td>
      <td>
        <button
          type="button"
          onClick={() => onDeleteUser(user.id)}
          className="hover:text-accent"
        >
          <TrashIcon />
        </button>
      </td>
    </tr>
  );
};
