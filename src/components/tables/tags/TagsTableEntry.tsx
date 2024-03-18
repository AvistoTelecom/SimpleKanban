import { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';
import { Tag } from '../../context/TagsContext';
import { TrashIcon } from '../../icons/TrashIcon';

type TableEntryProps = {
  tag: Tag;
  tagList: Tag[];
  onDeleteTag: (name: string) => void;
  onUpdateTag: (name: string, tag: Tag) => void;
};

export const TagsTableEntry: FunctionComponent<TableEntryProps> = ({
  tag,
  tagList,
  onDeleteTag,
  onUpdateTag,
}) => {
  const [name, setName] = useState<string>(tag.name);
  const [nameError, setNameError] = useState<string>('');

  const isValidTagName = (newName: string): boolean => {
    if (newName.length === 0) {
      setNameError("Name shouldn't be empty...");
      return false;
    }

    const tagFound: Tag | undefined = tagList.find(
      (tag: Tag) => tag.name === newName
    );
    if (tagFound && tagFound.name !== tag.name) {
      setNameError('Name already exists...');
      return false;
    }
    setNameError('');
    return true;
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName: string = event.target.value;
    isValidTagName(newName);
    setName(newName);
  };

  const onChangeColor = (event: ChangeEvent<HTMLInputElement>) => {
    const color: string = event.target.value;
    const newTag: Tag = { name: tag.name, color: color };
    onUpdateTag(tag.name, newTag);
  };

  const onSubmit = () => {
    if (!isValidTagName(name)) {
      return;
    }
    const newTag: Tag = { name: name, color: tag.color };
    onUpdateTag(tag.name, newTag);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      onSubmit();
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
            onChange={onNameChange}
            onBlur={onSubmit}
            onKeyDown={onKeyPress}
          />
          <span className="label-text-alt text-error absolute -bottom-5 left-1 italic">
            {nameError}
          </span>
        </label>
      </td>
      <td>
        <input
          type="color"
          value={tag.color}
          className="rounded-md bg-neutral"
          onChange={onChangeColor}
        />
      </td>
      <td>
        <button
          type="button"
          onClick={() => onDeleteTag(tag.name)}
          className="hover:text-accent"
        >
          <TrashIcon />
        </button>
      </td>
    </tr>
  );
};
