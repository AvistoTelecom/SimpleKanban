import { FunctionComponent } from 'react';
import { TagsTableHeader } from './TagsTableHeader';
import { TagsTableEntry } from './TagsTableEntry';
import { TagstableCreateRow } from './TagsTableCreateRow';
import { Tag } from '../../KanbanPage';

interface TagsTableProps {
  tags: Tag[];
  handleAddTag: (tag: Tag) => void;
  handleDeleteTag: (name: string) => void;
  handleUpdateTag: (name: string, newName: string, color: string) => void;
}

export const TagsTable: FunctionComponent<TagsTableProps> = ({
  tags,
  handleAddTag,
  handleDeleteTag,
  handleUpdateTag,
}) => {
  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <TagsTableHeader />
        <tbody>
          {tags?.length > 0 &&
            tags.map((tag: Tag) => {
              return (
                <TagsTableEntry
                  key={tag.name}
                  tag={tag}
                  tags={tags}
                  handleDeleteTag={handleDeleteTag}
                  handleUpdateTag={handleUpdateTag}
                />
              );
            })}
        </tbody>
        <TagstableCreateRow handleAddTag={handleAddTag} tags={tags} />
      </table>
    </div>
  );
};
