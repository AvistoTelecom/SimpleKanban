import { FunctionComponent } from 'react';
import { TagsTableHeader } from './TagsTableHeader';
import { TagsTableEntry } from './TagsTableEntry';
import { TagsTableCreateRow } from './TagsTableCreateRow';
import { Tag } from '../../context/TagsContext';

type TagsTableProps = {
  tagList: Tag[];
  onAddTag: (tag: Tag) => void;
  onDeleteTag: (name: string) => void;
  onUpdateTag: (name: string, tag: Tag) => void;
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
          {tagList.map((tag: Tag) => {
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
        <TagsTableCreateRow onAddTag={onAddTag} tagList={tagList} />
      </table>
    </div>
  );
};
