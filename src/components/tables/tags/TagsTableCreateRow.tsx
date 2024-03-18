import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';
import { DEFAULT_TAG_COLOR, Tag } from '../../context/TagsContext';
import { PlusIcon } from '../../icons/PlusIcon';

type TagsTableCreateRowProps = {
  tagList: Tag[];
  onAddTag: (tag: Tag) => void;
};

export const TagsTableCreateRow: FunctionComponent<TagsTableCreateRowProps> = ({
  onAddTag,
  tagList,
}) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>(DEFAULT_TAG_COLOR);
  const [nameError, setNameError] = useState<string>('');

  const isValidTagName = (newName: string): boolean => {
    if (newName.length === 0) {
      setNameError("Name shouldn't be empty...");
      return false;
    }

    const tagFound: Tag | undefined = tagList.find(
      (tag: Tag) => tag.name === newName
    );
    if (tagFound !== undefined) {
      setNameError('Name already exists...');
      return false;
    }
    return true;
  };

  const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor: string = event.target.value;
    setColor(newColor);
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (isValidTagName(newName)) {
      setNameError('');
    }
    setName(newName);
  };

  const onSubmit = () => {
    if (!isValidTagName(name)) {
      return;
    }
    onAddTag({ name: name, color: color });
    setColor(DEFAULT_TAG_COLOR);
    setName('');
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
              placeholder="Name..."
              className={
                'input input-bordered input-sm w-full max-w-xs' +
                (nameError.length === 0 ? '' : ' input-error')
              }
              value={name}
              onKeyDown={onKeyPress}
              onChange={onChangeName}
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
            onChange={onChangeColor}
          />
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
