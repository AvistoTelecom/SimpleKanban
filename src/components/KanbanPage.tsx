import { FunctionComponent, useState, MouseEvent, useContext } from 'react';
import { KanbanArea } from './KanbanArea';
import { SidePanel } from './SidePanel';
import { NavBar } from './NavBar';
import { TagsTable } from './tables/tags/TagsTable';
import { UsersTable } from './tables/users/UsersTable';
import {
  KabanPageContextType,
  KanbanPageContext,
  Tag,
  User,
} from './context/KanbanPageContext';

export type SidePanelContent = 'tag' | 'user' | '';

export const KanbanPage: FunctionComponent = () => {
  const [isSidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [contentID, setContentID] = useState<SidePanelContent>('');
  const {
    tagList,
    userList,
    addUser,
    addTag,
    deleteTag,
    deleteUser,
    updateTag,
    updateUser,
  } = useContext<KabanPageContextType>(KanbanPageContext);

  const onNavBar = (event: MouseEvent<HTMLButtonElement>) => {
    const id: SidePanelContent = event.currentTarget.value as SidePanelContent;
    if (contentID === '') {
      setSidePanelOpen(!isSidePanelOpen);
      setContentID(id);
      return;
    }

    if (contentID === id) {
      setSidePanelOpen(!isSidePanelOpen);
      setContentID('');
    } else {
      setContentID(id);
    }
  };

  const onAddUser = (user: Omit<User, 'id'>) => {
    addUser(user);
  };

  const onDeleteUser = (id: number) => {
    deleteUser(id);
  };

  const onUpdateUser = (
    id: number,
    name: string | null,
    image: string | null
  ) => {
    updateUser(id, { name: name, image: image });
  };

  const onAddTag = (newTag: Tag) => {
    addTag(newTag);
  };

  const onDeleteTag = (name: string) => {
    deleteTag(name);
  };

  const onUpdateTag = (
    name: string,
    newName: string | null,
    color: string | null
  ) => {
    updateTag(name, { name: newName, color: color });
  };

  return (
    <>
      <NavBar onNavBar={onNavBar} />
      <main className="flex-grow h-1 flex w-full space-x-2 p-2 bg-base-300">
        <KanbanArea />
        {isSidePanelOpen && (
          <SidePanel>
            {contentID === 'tag' && (
              <TagsTable
                tags={tagList}
                onAddTag={onAddTag}
                onDeleteTag={onDeleteTag}
                onUpdateTag={onUpdateTag}
              />
            )}
            {contentID === 'user' && (
              <UsersTable
                users={userList}
                onAddUser={onAddUser}
                onDeleteUser={onDeleteUser}
                onUpdateUser={onUpdateUser}
              />
            )}
          </SidePanel>
        )}
      </main>
    </>
  );
};
