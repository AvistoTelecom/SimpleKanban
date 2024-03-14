import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';
import { Tag } from '../../KanbanPage';

interface TableEntryProps {
  tag: Tag;
  tags: Tag[];
  handleDeleteTag: (name: string) => void;
  handleUpdateTag: (name: string, newName: string, color: string) => void;
}

export const TagsTableEntry: FunctionComponent<TableEntryProps> = ({
  tag,
  tags,
  handleDeleteTag,
  handleUpdateTag,
}) => {
  const [name, setName] = useState<string>(tag.name);
  const [color, setColor] = useState<string>(tag.color);
  const [nameError, setNameError] = useState<string>('');

  const isValidTagName = (newName: string): boolean => {
    if (newName.length === 0) {
      setNameError("Name shouldn't be empty...");
      return false;
    }

    const tagFound: Tag | undefined = tags.find(
      (tag: Tag) => tag.name === newName
    );
    if (tagFound && tagFound.name !== tag.name) {
      setNameError('Name already exists...');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName: string = e.target.value;
    isValidTagName(newName);
    setName(newName);
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;
    setColor(input);
  };

  const handleSubmit = () => {
    if (!isValidTagName(name)) {
      return;
    }
    handleUpdateTag(tag.name, name, color);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      e.currentTarget.blur();
      handleSubmit();
    }
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
              (nameError.length === 0 ? '' : ' input-error')
            }
            value={name}
            onChange={handleNameChange}
            onBlur={handleSubmit}
            onKeyDown={handleKeyPress}
          />
          <span className="label-text-alt text-error absolute -bottom-5 left-1 italic">
            {nameError}
          </span>
        </label>
      </td>
      <td>
        <input
          type="color"
          value={color}
          className="rounded-md bg-neutral"
          onChange={handleChangeColor}
        />
      </td>
      <td>
        <button
          type="button"
          onClick={() => handleDeleteTag(tag.name)}
          className="hover:text-accent"
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};
