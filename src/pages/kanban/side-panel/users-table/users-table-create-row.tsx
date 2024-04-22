import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';
import { ImageInput } from './image-input/image-input';
import { DEFAULT_PROFILE_PICTURE } from '../../context/user/user-context';
import { PlusIcon } from '../../../../components/plus-icon/plus-icon';
import { CreateUser } from '../../../../shared/types/create-user.type';

type UsersTableCreateRowProps = {
  onAddUser: (user: CreateUser) => void;
};

export const UsersTableCreateRow: FunctionComponent<
  UsersTableCreateRowProps
> = ({ onAddUser }) => {
  const [username, setUsername] = useState<string>('');
  const [image, setImage] = useState<string>(DEFAULT_PROFILE_PICTURE);
  const [nameError, setNameError] = useState<string>('');

  const isValidUserName = (newName: string): boolean => {
    if (newName.length === 0) {
      setNameError("Name shouldn't be empty...");
      return false;
    }
    setNameError('');
    return true;
  };

  const onChangeImage = (newImage: string) => {
    setImage(newImage);
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const newName: string = event.target.value;
    isValidUserName(newName);
    setUsername(newName);
  };

  const onSubmit = () => {
    if (!isValidUserName(username)) {
      return;
    }
    onAddUser({ name: username, image: image });
    setImage(DEFAULT_PROFILE_PICTURE);
    setUsername('');
  };

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      onSubmit();
    }
  };

  return (
    <tfoot>
      <tr>
        <th>
          <label className="form-control w-full max-w-xs relative">
            <input
              type="text"
              placeholder="Enter a name..."
              className={
                'input input-bordered input-sm w-full max-w-xs' +
                (nameError.length === 0 ? '' : ' input-error')
              }
              onChange={onChangeUsername}
              onKeyDown={onKeyPress}
              value={username}
            />
            <span className="label-text-alt text-error absolute -bottom-5 left-1 italic">
              {nameError}
            </span>
          </label>
        </th>
        <th>
          <ImageInput image={image} onChange={onChangeImage} />
        </th>
        <th>
          <button
            type="button"
            className="hover:text-primary"
            onClick={onSubmit}
          >
            <PlusIcon />
          </button>
        </th>
      </tr>
    </tfoot>
  );
};
