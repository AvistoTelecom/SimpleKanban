import { FunctionComponent } from 'react';
import { TagsTableHeader } from './TagsTableHeader';
import { TagsTableEntry } from './TagsTableEntry';
import { TagstableCreateRow } from './TagsTableCreateRow';
import { Tag } from '../../context/KanbanPageContext';

type TagsTableProps = {
  tags: Tag[];
  onAddTag: (tag: Tag) => void;
  onDeleteTag: (name: string) => void;
  onUpdateTag: (name: string, newName: string, color: string) => void;
};

export const TagsTable: FunctionComponent<TagsTableProps> = ({
  tags,
  onAddTag,
  onDeleteTag,
  onUpdateTag,
}) => {
  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <TagsTableHeader />
        <tbody>
          {tags.length > 0 &&
            tags.map((tag: Tag) => {
              return (
                <TagsTableEntry
                  key={tag.name}
                  tag={tag}
                  tags={tags}
                  onDeleteTag={onDeleteTag}
                  onUpdateTag={onUpdateTag}
                />
              );
            })}
        </tbody>
        <TagstableCreateRow onAddTag={onAddTag} tags={tags} />
      </table>
    </div>
  );
};
