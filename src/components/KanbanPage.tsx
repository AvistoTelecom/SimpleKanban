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
import { AddTicketForm } from './forms/AddTicketForm';
import { TicketContext, TicketContextType } from './context/TicketContext';
import { CreateTicket } from '../model/CreateTicket';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Ticket } from '../model/Ticket';

export type SidePanelContent = 'tag' | 'user' | 'addTicket' | '';
export type ColumnType = 'todo' | 'inProgress' | 'done' | '';

export const KanbanPage: FunctionComponent = () => {
  const [isSidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [contentID, setContentID] = useState<SidePanelContent>('');
  const [newTicketDefaultType, setNewTicketDefaultType] =
    useState<ColumnType>('todo');
  const { userList, addUser, deleteUser, updateUser } =
    useContext<UsersContextType>(UsersContext);

  const { tagList, addTag, deleteTag, updateTag } =
    useContext<TagsContextType>(TagsContext);

  const { ticketList, addTicket } =
    useContext<TicketContextType>(TicketContext);

  const [todoTicketList, setTodoTicketList] = useState<Ticket[]>([
    {
      id: 1,
      name: 'Ticket 1',
      creationDate: new Date(),
      storyPoint: 1,
      assigneId: 1,
      tagName: 'tag1',
      description: '',
      parentId: null,
      childId: null,
      blocked: false,
    },
    {
      id: 2,
      name: 'Ticket 2',
      creationDate: new Date(),
      storyPoint: 1,
      assigneId: 1,
      tagName: 'tag2',
      description: '',
      parentId: null,
      childId: null,
      blocked: false,
    },
    {
      id: 3,
      name: 'Ticket 3',
      creationDate: new Date(),
      storyPoint: 1,
      assigneId: 1,
      tagName: 'tag3',
      description: '',
      parentId: null,
      childId: null,
      blocked: false,
    },
    {
      id: 4,
      name: 'Ticket 4',
      creationDate: new Date(),
      storyPoint: 1,
      assigneId: 1,
      tagName: 'tag1',
      description: '',
      parentId: null,
      childId: null,
      blocked: false,
    },
    {
      id: 5,
      name: 'Ticket 5',
      creationDate: new Date(),
      storyPoint: 1,
      assigneId: 1,
      tagName: 'tag2',
      description: '',
      parentId: null,
      childId: null,
      blocked: false,
    },
  ]);

  const [inProgressTicketList, setInProgressTicketList] = useState<Ticket[]>(
    []
  );

  const [doneTicketList, setDoneTicketList] = useState<Ticket[]>([]);

  const toggleSidePanel = (id: SidePanelContent, type?: ColumnType) => {
    if (type !== undefined) {
      setNewTicketDefaultType(type);
    }
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

  const onAddTicket = (ticket: CreateTicket) => {
    addTicket(ticket);
    toggleSidePanel(contentID);
  }

  const reorderTicketColumn = (
    ticketList: Ticket[],
    sourceIndex: number,
    destinationIndex: number
  ): Ticket[] => {
    return ticketList
      .toSpliced(sourceIndex, 1)
      .toSpliced(destinationIndex, 0, ticketList[sourceIndex]);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn === destinationColumn) {
      switch (sourceColumn) {
        case 'todo': {
          setTodoTicketList(
            reorderTicketColumn(todoTicketList, source.index, destination.index)
          );
          break;
        }
        case 'inProgress': {
          setInProgressTicketList(
            reorderTicketColumn(
              inProgressTicketList,
              source.index,
              destination.index
            )
          );
          break;
        }
        case 'done': {
          setDoneTicketList(
            reorderTicketColumn(doneTicketList, source.index, destination.index)
          );
          break;
        }
        default: {
          return;
        }
      }
      return;
    }

    let toMoveTicket;

    switch (sourceColumn) {
      case 'todo': {
        const newTodoTicketList = Array.from(todoTicketList);
        toMoveTicket = newTodoTicketList.splice(source.index, 1);
        setTodoTicketList(newTodoTicketList);
        break;
      }
      case 'inProgress': {
        const newInProgressTicketList = Array.from(inProgressTicketList);
        toMoveTicket = newInProgressTicketList.splice(source.index, 1);
        setInProgressTicketList(newInProgressTicketList);
        break;
      }
      case 'done': {
        const newDoneTicketList = Array.from(doneTicketList);
        toMoveTicket = newDoneTicketList.splice(source.index, 1);
        setDoneTicketList(newDoneTicketList);
        break;
      }
      default: {
        return;
      }
    }

    switch (destinationColumn) {
      case 'todo': {
        const newTodoTicket = Array.from(todoTicketList);
        newTodoTicket.splice(destination.index, 0, toMoveTicket[0]);
        setTodoTicketList(newTodoTicket);
        break;
      }
      case 'inProgress': {
        const newInProgressTicket = Array.from(inProgressTicketList);
        newInProgressTicket.splice(destination.index, 0, toMoveTicket[0]);
        setInProgressTicketList(newInProgressTicket);
        break;
      }
      case 'done': {
        const newDoneTicket = Array.from(doneTicketList);
        newDoneTicket.splice(destination.index, 0, toMoveTicket[0]);
        setDoneTicketList(newDoneTicket);
        break;
      }
      default: {
        return;
      }
    }
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
          <DragDropContext onDragEnd={onDragEnd}>
            <TicketColumn
              type="todo"
              onClick={toggleSidePanel}
              ticketList={todoTicketList}
              userList={userList}
              tagList={tagList}
            />
            <TicketColumn
              type="inProgress"
              onClick={toggleSidePanel}
              ticketList={inProgressTicketList}
              userList={userList}
              tagList={tagList}
            />
            <TicketColumn
              type="done"
              onClick={toggleSidePanel}
              ticketList={doneTicketList}
              userList={userList}
              tagList={tagList}
            />
          </DragDropContext>
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
          {contentID === 'addTicket' && (
            <AddTicketForm
              defaultType={newTicketDefaultType}
              userList={userList}
              tagList={tagList}
              ticketList={ticketList}
              onAddTicket={onAddTicket}
            />
            )}
        </SidePanel>
      </main>
    </>
  );
};
