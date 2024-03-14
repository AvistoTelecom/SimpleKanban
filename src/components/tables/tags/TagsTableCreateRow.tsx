import { ChangeEvent, FunctionComponent, useState } from 'react';
import { Tag } from '../../KanbanPage';

interface TagstableCreateRowProps {
  tags: Tag[];
  handleAddTag: (tag: Tag) => void;
}

const DEFAULT_COLOR: string = '#000000';

export const TagstableCreateRow: FunctionComponent<TagstableCreateRowProps> = ({
  handleAddTag,
  tags,
}) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [nameError, setNameError] = useState<string>('');

  const isValidTagName = (newName: string): boolean => {
    if (newName.length === 0) {
      setNameError("Name shouldn't be empty...");
      return false;
    }

    const tagFound: Tag | undefined = tags.find(
      (tag: Tag) => tag.name === newName
    );
    if (tagFound !== undefined) {
      setNameError('Name already exists...');
      return false;
    }
    return true;
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor: string = e.target.value;
    setColor(newColor);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (isValidTagName(newName)) {
      setNameError('');
    }
    setName(newName);
  };

  const handleSubmit = () => {
    if (!isValidTagName(name)) {
      return;
    }
    handleAddTag({ name: name, color: color } as Tag);
    setColor(DEFAULT_COLOR);
    setName('');
  };

  return (
    <tfoot>
      <tr>
        <th>
          <label className="form-control w-full max-w-xs relative">
            <input
              type="text"
              placeholder="Name..."
              className={
                'input input-bordered input-sm w-full max-w-xs' +
                (nameError.length === 0 ? '' : ' input-error')
              }
              value={name}
              onChange={handleChangeName}
            ></input>
            <span className="label-text-alt text-error absolute -bottom-5 left-1 italic">
              {nameError}
            </span>
          </label>
        </th>
        <th>
          <input
            type="color"
            value={color}
            className="rounded-md bg-neutral cursor-pointer"
            onChange={handleChangeColor}
          />
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
