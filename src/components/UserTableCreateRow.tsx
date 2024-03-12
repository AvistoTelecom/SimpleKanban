import { ChangeEvent, FunctionComponent, useState } from 'react';
import { DEFAULT_PROFILE_PICTURE, User } from './UserTable';

interface UserTableCreateRowProps {
  handleAddUser: (user: User) => void;
}

export const UserTableCreateRow: FunctionComponent<UserTableCreateRowProps> = ({
  handleAddUser,
}) => {
  const [username, setUsername] = useState('');
  const [image, setImage] = useState<string>(DEFAULT_PROFILE_PICTURE);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage: File = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64string = reader.result as string;
        setImage(base64string);
      };
      reader.readAsDataURL(uploadedImage);
    }
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;
    setUsername(input);
  };

  const handleSumbit = () => {
    if (username.length === 0) {
      return; // TODO : maybe error message
    }
    handleAddUser({ name: username, image: image } as User);
    setImage(DEFAULT_PROFILE_PICTURE);
    setUsername('');
  };

  return (
    <tfoot>
      <tr>
        <th>
          <label>
            <input
              type="text"
              placeholder="Enter a name..."
              className="input input-bordered input-s w-full max-w-xs"
              onChange={handleChangeUsername}
              value={username}
            />
          </label>
        </th>
        <th className="">
          <div className="avatar">
            <label className="mask mask-squircle w-12 h-12 cursor-pointer">
              <img src={image} alt="Avatar" />
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                value={''}
              />
            </label>
          </div>
        </th>
        <th>
          <button
            type="button"
            className="hover:text-primary"
            onClick={handleSumbit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </th>
      </tr>
    </tfoot>
  );
};
