import { ChangeEvent, FunctionComponent, useState } from 'react';
import { DEFAULT_PROFILE_PICTURE, User } from '../../KanbanPage';

interface UsersTableCreateRowProps {
  handleAddUser: (user: User) => void;
}

export const UsersTableCreateRow: FunctionComponent<
  UsersTableCreateRowProps
> = ({ handleAddUser }) => {
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

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage: File = e.target.files[0];
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        const base64string: string = reader.result as string;
        setImage(base64string);
      };
      reader.readAsDataURL(uploadedImage);
    }
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const newName: string = e.target.value;
    isValidUserName(newName);
    setUsername(newName);
  };

  const handleSubmit = () => {
    if (!isValidUserName(username)) {
      return;
    }
    handleAddUser({ name: username, image: image } as User);
    setImage(DEFAULT_PROFILE_PICTURE);
    setUsername('');
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
              onChange={handleChangeUsername}
              value={username}
            />
            <span className="label-text-alt text-error absolute -bottom-5 left-1 italic">
              {nameError}
            </span>
          </label>
        </th>
        <th>
          <label className="avatar w-12 h-12 cursor-pointer hover:text-primary">
            <div className="mask mask-squircle">
              <img src={image} alt="Avatar" />
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleChangeImage}
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
            onClick={handleSubmit}
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
