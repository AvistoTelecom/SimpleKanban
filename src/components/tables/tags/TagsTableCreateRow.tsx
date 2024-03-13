import { ChangeEvent, FunctionComponent, useState } from 'react';
import { Tag } from './TagsTable';

interface TagstableCreateRowProps {
  handleAddTag: (tag: Tag) => void;
}

export const TagstableCreateRow: FunctionComponent<TagstableCreateRowProps> = ({
  handleAddTag,
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;
    setColor(input);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO (compare with other names to avoid duplicated tags)
    const input = e.target.value;
    setName(input);
  };

  const handleSubmit = () => {
    // TODO
  };

  return (
    <tfoot>
      <tr>
        <th>
          <input
            type="text"
            placeholder="Name..."
            className="input input-bordered input-sm w-full max-w-xs"
            value={name}
            onChange={handleChangeName}
          ></input>
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
