import { FunctionComponent, useState, useContext } from 'react';
import { KanbanArea } from './kanban-area/kanban-area';
import { SidePanel } from './side-panel/side-panel';
import { NavBar } from '../../components/navbar/navbar';
import { TagsTable } from './side-panel/tags-table/tags-table';
import { UsersTable } from './side-panel/users-table/users-table';
import { TicketColumn } from './kanban-area/ticket-column/ticket-column';
import { AddTicketForm } from './side-panel/add-ticket-form/add-ticket-form';
import {
  TicketContext,
  TicketContextType,
} from './context/ticket/ticket-context';
import { CreateTicket } from '../../shared/types/create-ticket.type';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { Ticket } from '../../shared/types/ticket.type';
import { TicketView } from './side-panel/ticket-details/ticket-details';
import { EditTicketForm } from './side-panel/edit-ticket-form/edit-ticket-form';
import { UserContext, UserContextType } from './context/user/user-context';
import { CreateUser } from '../../shared/types/create-user.type';
import { User } from '../../shared/types/user.type';
import { Tag } from '../../shared/types/tag.type';
import { TagContext, TagContextType } from './context/tag/tag-context';
import { ColumnType } from '../../shared/types/column-type.type';

export type SidePanelContent =
  | 'tag'
  | 'user'
  | 'addTicket'
  | 'viewTicket'
  | 'editTicket'
  | '';

export const KanbanPage: FunctionComponent = () => {
  const [isSidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [contentID, setContentID] = useState<SidePanelContent>('');
  const [newTicketDefaultType, setNewTicketDefaultType] =
    useState<ColumnType>('todo');
  const [sidePanelTicket, setSidePanelTicket] = useState<Ticket>();

  const [focusedTicket, setFocusTicket] = useState<Ticket | null>(null);

  const [isDropDisabled, setIsDropDisabled] = useState<boolean>(false);

  const { userList, dispatchUserList } =
    useContext<UserContextType>(UserContext);
  const { tagList, dispatchTagList } = useContext<TagContextType>(TagContext)!;
  const {
    todoTicketList,
    inProgressTicketList,
    doneTicketList,
    dispatchTicketList,
  } = useContext<TicketContextType>(TicketContext);

  const toggleSidePanelWithTicketInfo = (
    id: SidePanelContent,
    ticketId: string
  ) => {
    if (sidePanelTicket?.id === ticketId && contentID === id) {
      setSidePanelOpen(false);
      setSidePanelTicket(undefined);
      setContentID('');
      return;
    }

    const ticket = todoTicketList
      .concat(inProgressTicketList)
      .concat(doneTicketList)
      .find((savedTicket) => savedTicket.id === ticketId);

    if (!ticket) {
      return;
    }

    setSidePanelTicket(ticket);
    setSidePanelOpen(true);
    setContentID(id);
  };

  const toggleSidePanel = (id: SidePanelContent, type?: ColumnType) => {
    setSidePanelTicket(undefined);
    if (type) {
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
    dispatchUserList({ type: 'ADD-USER', payload: user });
  };

  const onDeleteUser = (id: string) => {
    dispatchUserList({ type: 'DELETE-USER', payload: id });
  };

  const onUpdateUser = (user: User) => {
    dispatchUserList({ type: 'UPDATE-USER', payload: user });
  };

  const onAddTag = (newTag: Tag) => {
    dispatchTagList({ type: 'ADD-TAG', payload: newTag });
  };

  const onDeleteTag = (name: string) => {
    dispatchTagList({ type: 'DELETE-TAG', payload: name });
  };

  const onUpdateTag = (name: string, tag: Tag) => {
    dispatchTagList({
      type: 'UPDATE-TAG',
      payload: { name: name, newTag: tag },
    });
  };

  const onAddTicket = (ticket: CreateTicket) => {
    dispatchTicketList({ type: 'ADD-TICKET', payload: ticket });
    toggleSidePanel(contentID);
  };

  const onEditTicket = (ticket: Ticket) => {
    dispatchTicketList({ type: 'UPDATE-TICKET', payload: ticket });
    toggleSidePanel(contentID);
  };

  const onDeleteTicket = (ticketId: string) => {
    dispatchTicketList({ type: 'DELETE-TICKET', payload: ticketId });
    toggleSidePanel(contentID);
  };

  const onClickOnEditTicket = (ticketId: string) => {
    toggleSidePanelWithTicketInfo('editTicket', ticketId);
  };

  const onBeforeDragStart = (result: DragStart) => {
    const { source } = result;
    const sourceColumn = source.droppableId;
    if (sourceColumn !== 'todo') {
      setIsDropDisabled(false);
      return;
    }
    const movingTicket = todoTicketList.at(source.index);
    setIsDropDisabled(movingTicket?.blocked ?? false);
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
          dispatchTicketList({
            type: 'REORDER-TODO-LIST-TICKET',
            payload: {
              sourceIndex: source.index,
              destinationIndex: destination.index,
            },
          });
          break;
        }
        case 'inProgress': {
          dispatchTicketList({
            type: 'REORDER-INPROGRESS-LIST-TICKET',
            payload: {
              sourceIndex: source.index,
              destinationIndex: destination.index,
            },
          });
          break;
        }
        case 'done': {
          dispatchTicketList({
            type: 'REORDER-DONE-LIST-TICKET',
            payload: {
              sourceIndex: source.index,
              destinationIndex: destination.index,
            },
          });
          break;
        }
        default: {
          return;
        }
      }
      return;
    }

    let toMoveTicket: Ticket | undefined;
    let toMoveTicketId: string;

    if (sourceColumn === 'todo') {
      toMoveTicket = todoTicketList.at(source.index);
      if (toMoveTicket === undefined) {
        return;
      }
      toMoveTicketId = toMoveTicket.id;

      if (destinationColumn === 'inProgress') {
        dispatchTicketList({
          type: 'SET-TODO-TO-INPROGRESS-TICKET',
          payload: {
            ticketId: toMoveTicketId,
            destinationIndex: destination.index,
          },
        });
        return;
      }
      if (destinationColumn === 'done') {
        dispatchTicketList({
          type: 'SET-TODO-TO-DONE-TICKET',
          payload: {
            ticketId: toMoveTicketId,
            destinationIndex: destination.index,
          },
        });
      }
      return;
    }

    if (sourceColumn === 'inProgress') {
      toMoveTicket = inProgressTicketList.at(source.index);
      if (toMoveTicket === undefined) {
        return;
      }
      toMoveTicketId = toMoveTicket.id;

      if (destinationColumn === 'todo') {
        dispatchTicketList({
          type: 'SET-INPROGRESS-TO-TODO-TICKET',
          payload: {
            ticketId: toMoveTicketId,
            destinationIndex: destination.index,
          },
        });
        return;
      }
      if (destinationColumn === 'done') {
        dispatchTicketList({
          type: 'SET-INPROGRESS-TO-DONE-TICKET',
          payload: {
            ticketId: toMoveTicketId,
            destinationIndex: destination.index,
          },
        });
      }
      return;
    }

    if (sourceColumn === 'done') {
      toMoveTicket = doneTicketList.at(source.index);
      if (toMoveTicket === undefined) {
        return;
      }
      toMoveTicketId = toMoveTicket.id;

      if (destinationColumn === 'todo') {
        dispatchTicketList({
          type: 'SET-DONE-TO-TODO-TICKET',
          payload: {
            ticketId: toMoveTicketId,
            destinationIndex: destination.index,
          },
        });
        return;
      }
      if (destinationColumn === 'inProgress') {
        dispatchTicketList({
          type: 'SET-DONE-TO-INPROGRESS-TICKET',
          payload: {
            ticketId: toMoveTicketId,
            destinationIndex: destination.index,
          },
        });
      }
      return;
    }
  };

  const onMouseEnterCard = (ticket: Ticket) => {
    setFocusTicket(ticket);
  };

  const onMouseLeaveCard = () => {
    setFocusTicket(null);
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
          <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeDragStart={onBeforeDragStart}
          >
            <TicketColumn
              type="todo"
              focusedTicket={focusedTicket}
              onMouseEnter={onMouseEnterCard}
              onMouseLeave={onMouseLeaveCard}
              onClickOnCard={toggleSidePanelWithTicketInfo}
              onClickOnAdd={toggleSidePanel}
              ticketList={todoTicketList}
              userList={userList}
              tagList={tagList}
            />
            <TicketColumn
              type="inProgress"
              focusedTicket={focusedTicket}
              onMouseEnter={onMouseEnterCard}
              onMouseLeave={onMouseLeaveCard}
              onClickOnCard={toggleSidePanelWithTicketInfo}
              onClickOnAdd={toggleSidePanel}
              ticketList={inProgressTicketList}
              userList={userList}
              tagList={tagList}
              isDropDisabled={isDropDisabled}
            />
            <TicketColumn
              type="done"
              focusedTicket={focusedTicket}
              onMouseEnter={onMouseEnterCard}
              onMouseLeave={onMouseLeaveCard}
              onClickOnCard={toggleSidePanelWithTicketInfo}
              onClickOnAdd={toggleSidePanel}
              ticketList={doneTicketList}
              userList={userList}
              tagList={tagList}
              isDropDisabled={isDropDisabled}
            />
          </DragDropContext>
        </KanbanArea>
        <SidePanel
          isOpen={isSidePanelOpen}
          closePanel={() => toggleSidePanel(contentID)}
        >
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
              ticketList={todoTicketList
                .concat(inProgressTicketList)
                .concat(doneTicketList)}
              onAddTicket={onAddTicket}
            />
          )}
          {contentID === 'viewTicket' && sidePanelTicket !== undefined && (
            <TicketView
              onClickOnEditButton={onClickOnEditTicket}
              onClickOnDeleteButton={onDeleteTicket}
              ticket={sidePanelTicket}
              assigne={userList.find(
                (user) => user.id === sidePanelTicket.assigneId
              )}
              parentTicket={todoTicketList
                .concat(inProgressTicketList)
                .concat(doneTicketList)
                .find((ticket) => ticket.id === sidePanelTicket.parentId)}
              childTicket={todoTicketList
                .concat(inProgressTicketList)
                .concat(doneTicketList)
                .find((ticket) => ticket.id === sidePanelTicket.childId)}
              tag={tagList.find((tag) => tag.name === sidePanelTicket.tagName)}
            />
          )}
          {contentID === 'editTicket' && sidePanelTicket !== undefined && (
            <EditTicketForm
              ticket={sidePanelTicket}
              userList={userList}
              tagList={tagList}
              ticketList={todoTicketList
                .concat(inProgressTicketList)
                .concat(doneTicketList)}
              onEditTicket={onEditTicket}
            />
          )}
        </SidePanel>
      </main>
    </>
  );
};
