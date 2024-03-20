import { FunctionComponent, useState, useContext } from 'react';
import { KanbanArea } from './KanbanArea';
import { SidePanel } from './SidePanel';
import { NavBar } from './NavBar';
import { TagsTable } from './tables/tags/TagsTable';
import { UsersTable } from './tables/users/UsersTable';
import { Tag, TagsContext, TagsContextType } from './context/TagsContext';
import {
  CreateUser,
  User,
  UsersContext,
  UsersContextType,
} from './context/UsersContext';
import { TicketColumn } from './TicketColumn';
import { TicketContext, TicketContextType } from './context/TicketContext';

export type SidePanelContent = 'tag' | 'user' | 'addTicket' | '';
export type ColumnType = 'todo' | 'inProgress' | 'done' | '';

export const KanbanPage: FunctionComponent = () => {
  const [isSidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [contentID, setContentID] = useState<SidePanelContent>('');
  const { userList, addUser, deleteUser, updateUser } =
    useContext<UsersContextType>(UsersContext);

  const { tagList, addTag, deleteTag, updateTag } =
    useContext<TagsContextType>(TagsContext);

  const { ticketList } = useContext<TicketContextType>(TicketContext);

  const toggleSidePanel = (id: SidePanelContent) => {
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

  const onAddUser = (user: CreateUser) => {
    addUser(user);
  };

  const onDeleteUser = (id: number) => {
    deleteUser(id);
  };

  const onUpdateUser = (user: User) => {
    updateUser(user);
  };

  const onAddTag = (newTag: Tag) => {
    addTag(newTag);
  };

  const onDeleteTag = (name: string) => {
    deleteTag(name);
  };

  const onUpdateTag = (name: string, tag: Tag) => {
    updateTag(name, tag);
  };

  return (
    <>
      <NavBar onClick={toggleSidePanel} />
      <main
        className={
          'flex-grow h-1 flex w-full p-2 bg-base-300' +
          (isSidePanelOpen ? ' space-x-2' : '')
        }
      >
        <KanbanArea>
          <TicketColumn
            type="todo"
            onClick={toggleSidePanel}
            ticketList={ticketList}
            userList={userList}
            tagList={tagList}
          />
          <TicketColumn
            type="inProgress"
            onClick={toggleSidePanel}
            ticketList={[]}
            userList={userList}
            tagList={tagList}
          />
          <TicketColumn
            type="done"
            onClick={toggleSidePanel}
            ticketList={[]}
            userList={userList}
            tagList={tagList}
          />
        </KanbanArea>
        <SidePanel isOpen={isSidePanelOpen}>
          {contentID === 'tag' && (
            <TagsTable
              tagList={tagList}
              onAddTag={onAddTag}
              onDeleteTag={onDeleteTag}
              onUpdateTag={onUpdateTag}
            />
          )}
          {contentID === 'user' && (
            <UsersTable
              userList={userList}
              onAddUser={onAddUser}
              onDeleteUser={onDeleteUser}
              onUpdateUser={onUpdateUser}
            />
          )}
        </SidePanel>
      </main>
    </>
  );
};
