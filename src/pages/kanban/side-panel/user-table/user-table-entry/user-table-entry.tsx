import { ChangeEvent, KeyboardEvent, FunctionComponent, useState } from 'react';
import { User } from '@model/user/user.type';
import { TrashIcon } from '@components/trash-icon/trash-icon';
import { ImageInput } from '../image-input/image-input';
import { Image } from '@model/image/image.type';
import { DEFAULT_PROFILE_PICTURE } from '@pages/kanban/context/image/image-context';
import { ImageCreate } from '@model/image/create-image/create-image.type';

type UserEntryProps = {
  user: User;
  image?: Image;
  onDeleteUser: (id: string) => void;
  onUpdateUser: (user: User) => void;
  onUpdateImage: (image: Image) => void;
  onAddImageToUser: (image: ImageCreate, userId: string) => void;
};

export const UsersTableEntry: FunctionComponent<UserEntryProps> = ({
  user,
  image,
  onDeleteUser,
  onUpdateUser,
  onUpdateImage,
  onAddImageToUser,
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
    const newUser: User = { ...user, name };
    onUpdateUser(newUser);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      onSubmit();
    }
  };

  const onChangeImage = (newImage: string) => {
    if (!image) {
      onAddImageToUser(
        {
          data: newImage,
        },
        user.id
      );
      return;
    }
    const updatedImage: Image = {
      ...image,
      data: newImage,
    };
    onUpdateImage(updatedImage);
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
        <ImageInput
          image={image ?? DEFAULT_PROFILE_PICTURE}
          onChange={onChangeImage}
        />
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
