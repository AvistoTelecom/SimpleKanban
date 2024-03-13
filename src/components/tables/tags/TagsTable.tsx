import { FunctionComponent, useState } from 'react';
import { TagsTableHeader } from './TagsTableHeader';
import { TagsTableEntry } from './TagsTableEntry';
import { TagstableCreateRow } from './TagsTableCreateRow';

// TODO : remove (debugging only, replace with localstorage branch model)
export interface Tag {
  name: string;
  color: string;
}

interface TagsTableProps {
  tags: Tag[];
}

const defaultTags: Tag[] = [
  {
    name: 'tag1',
    color: '#ff0000',
  } as Tag,
  {
    name: 'tag2',
    color: '#00ff00',
  } as Tag,
  {
    name: 'tag3',
    color: '#0000ff',
  } as Tag,
];

export const TagsTable: FunctionComponent<TagsTableProps> = () => {
  const [tags, setTags] = useState<Tag[]>(defaultTags);

  const handleDeleteTag = () => {
    // TODO : implement with local storage
  };

  const handleAddTag = () => {
    // TODO : implement with local storage
  };

  const handleUpdateTag = () => {
    // TODO : implement with local storage
  };

  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <TagsTableHeader />
        <tbody>
          {tags?.length &&
            tags.map((tag) => {
              return (
                <TagsTableEntry
                  key={tag.name}
                  tag={tag}
                  handleDeleteTag={handleDeleteTag}
                  handleUpdateTag={handleUpdateTag}
                />
              );
            })}
        </tbody>
        <TagstableCreateRow handleAddTag={handleAddTag} />
      </table>
    </div>
  );
};
