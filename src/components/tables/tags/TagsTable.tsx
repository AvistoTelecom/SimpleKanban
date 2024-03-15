import { FunctionComponent } from 'react';
import { TagsTableHeader } from './TagsTableHeader';
import { TagsTableEntry } from './TagsTableEntry';
import { TagstableCreateRow } from './TagsTableCreateRow';
import { Tag } from '../../context/KanbanPageContext';

type TagsTableProps = {
  tagList: Tag[];
  onAddTag: (tag: Tag) => void;
  onDeleteTag: (name: string) => void;
  onUpdateTag: (
    name: string,
    newName: string | null,
    color: string | null
  ) => void;
};

export const TagsTable: FunctionComponent<TagsTableProps> = ({
  tagList,
  onAddTag,
  onDeleteTag,
  onUpdateTag,
}) => {
  return (
    <div className="overflow-y-auto h-full">
      <table className="table table-zebra table-pin-rows">
        <TagsTableHeader />
        <tbody>
          {tagList.length > 0 &&
            tagList.map((tag: Tag) => {
              return (
                <TagsTableEntry
                  key={tag.name}
                  tag={tag}
                  tagList={tagList}
                  onDeleteTag={onDeleteTag}
                  onUpdateTag={onUpdateTag}
                />
              );
            })}
        </tbody>
        <TagstableCreateRow onAddTag={onAddTag} tagList={tagList} />
      </table>
    </div>
  );
};
