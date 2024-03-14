import { FunctionComponent } from 'react';
import { UsersTable } from './tables/users/UsersTable';
import { TagsTable } from './tables/tags/TagsTable';
import { Tag, User } from './KanbanPage';

interface SidePanelProps {
  content: string;
  tags: Tag[];
  users: User[];
  handleAddUser: (user: User) => void;
  handleDeleteUser: (id: number) => void;
  handleUpdateUser: (
    id: number,
    name: string | null,
    image: File | null
  ) => void;
  handleAddTag: (tag: Tag) => void;
  handleDeleteTag: (name: string) => void;
  handleUpdateTag: (name: string, newName: string, color: string) => void;
}

export const SidePanel: FunctionComponent<SidePanelProps> = ({
  content,
  tags,
  users,
  handleAddTag,
  handleAddUser,
  handleDeleteTag,
  handleDeleteUser,
  handleUpdateTag,
  handleUpdateUser,
}) => {
  return (
    <div className="w-full h-full bg-base-100 rounded-box p-2">
      {content === 'tag' ? (
        <TagsTable
          tags={tags}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
          handleUpdateTag={handleUpdateTag}
        />
      ) : content === 'user' ? (
        <UsersTable
          users={users}
          handleAddUser={handleAddUser}
          handleDeleteUser={handleDeleteUser}
          handleUpdateUser={handleUpdateUser}
        />
      ) : null}
    </div>
  );
};
