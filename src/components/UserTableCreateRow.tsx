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
          <label className="avatar w-12 h-12 cursor-pointer hover:text-primary">
            <div className="mask mask-squircle">
              <img src={image} alt="Avatar" />
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              value={''}
            />
            <span className="-top-1 left-9 absolute w-5 h-5 bg-neutral rounded-full flex items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
              </svg>
            </span>
          </label>
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
