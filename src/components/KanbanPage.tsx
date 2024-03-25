import { FunctionComponent, useState, useContext } from 'react';
import { KanbanArea } from './KanbanArea';
import { SidePanel } from './SidePanel';
import { NavBar } from './NavBar';
import { TagsTable } from './tables/tags/TagsTable';
import { UsersTable } from './tables/users/UsersTable';
import { TicketColumn } from './TicketColumn';
import { AddTicketForm } from './forms/AddTicketForm';
import { TicketContext, TicketContextType } from './context/TicketContext';
import { CreateTicket } from '../model/CreateTicket';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Ticket } from '../model/Ticket';
import { TicketView } from './TicketDetails';
import { EditTicketForm } from './forms/EditTicketForm';
import { UserContext, UserContextType } from './context/UserContext';
import { CreateUser } from '../model/CreateUser';
import { User } from '../model/User';
import { Tag } from '../model/Tag';
import { TagContext, TagContextType } from './context/TagContext';

export type SidePanelContent =
  | 'tag'
  | 'user'
  | 'addTicket'
  | 'viewTicket'
  | 'editTicket'
  | '';
export type ColumnType = 'todo' | 'inProgress' | 'done' | '';

export const KanbanPage: FunctionComponent = () => {
  const [isSidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [contentID, setContentID] = useState<SidePanelContent>('');
  const [newTicketDefaultType, setNewTicketDefaultType] =
    useState<ColumnType>('todo');

  const { userList, dispatchUserList } =
    useContext<UserContextType>(UserContext);
  const { tagList, dispatchTagList } = useContext<TagContextType>(TagContext)!;
  const {
    todoTicketList,
    inProgressTicketList,
    doneTicketList,
    dispatchTicketList,
  } = useContext<TicketContextType>(TicketContext);

  const toggleSidePanel = (
    id: SidePanelContent,
    type?: ColumnType,
    ticketId?: string
  ) => {
    if (ticketId !== undefined) {
      const ticket = ticketList.find(
        (savedTicket) => savedTicket.id === ticketId
      );
      if (ticket === undefined) {
        return;
      }
      setSidePanelTicket(ticket);
    }
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
    dispatchUserList({ type: 'ADD-USER', payload: user });
  };

  const onDeleteUser = (id: number) => {
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
    console.log(ticket);
    updateTicket(ticket);
    toggleSidePanel(contentID);
  };

  const onClickOnEditTicket = (ticketId: string) => {
    toggleSidePanel('editTicket', undefined, ticketId);
  };

  const reorderTicketColumn = (
    ticketList: Ticket[],
    sourceIndex: number,
    destinationIndex: number
  ): Ticket[] => {
    console.log('Call reorderTicketColumn');
    console.log(ticketList);
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
          dispatchTicketList({
            type: 'REORDER-TODO-LIST-TICKET',
            payload: reorderTicketColumn(
              todoTicketList,
              source.index,
              destination.index
            ),
          });
          break;
        }
        case 'inProgress': {
          dispatchTicketList({
            type: 'REORDER-INPROGRESS-LIST-TICKET',
            payload: reorderTicketColumn(
              inProgressTicketList,
              source.index,
              destination.index
            ),
          });
          break;
        }
        case 'done': {
          dispatchTicketList({
            type: 'REORDER-DONE-LIST-TICKET',
            payload: reorderTicketColumn(
              doneTicketList,
              source.index,
              destination.index
            ),
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
    let toMoveTicketId: number;

    if (sourceColumn === 'todo') {
      toMoveTicket = todoTicketList.at(source.index);
      if (toMoveTicket === undefined) {
        return;
      }
      toMoveTicketId = toMoveTicket.id;

      if (destinationColumn === 'inProgress') {
        console.log('drop inProgress');

        dispatchTicketList({
          type: 'SET-TODO-TO-INPROGRESS-TICKET',
          payload: toMoveTicketId,
        });

        const sourceIndex = inProgressTicketList.findIndex(
          (currTicket) => currTicket.id === toMoveTicketId
        );
        console.log(inProgressTicketList);

        console.log(sourceIndex);

        dispatchTicketList({
          type: 'REORDER-INPROGRESS-LIST-TICKET',
          payload: reorderTicketColumn(
            inProgressTicketList,
            sourceIndex,
            destination.index
          ),
        });
        return;
      }

      if (destinationColumn === 'done') {
        dispatchTicketList({
          type: 'SET-TODO-TO-DONE-TICKET',
          payload: toMoveTicketId,
        });

        const sourceIndex = doneTicketList.findIndex(
          (currTicket) => currTicket.id === toMoveTicketId
        );

        dispatchTicketList({
          type: 'REORDER-DONE-LIST-TICKET',
          payload: reorderTicketColumn(
            doneTicketList,
            sourceIndex,
            destination.index
          ),
        });
      }
      return;
    }

    if (sourceColumn === 'inProgress') {
      toMoveTicket = todoTicketList.at(source.index);

      if (toMoveTicket === undefined) {
        return;
      }

      toMoveTicketId = toMoveTicket.id;

      if (destinationColumn === 'todo') {
        dispatchTicketList({
          type: 'SET-INPROGRESS-TO-TODO-TICKET',
          payload: toMoveTicketId,
        });

        const sourceIndex = todoTicketList.findIndex(
          (currTicket) => currTicket.id === toMoveTicketId
        );

        dispatchTicketList({
          type: 'REORDER-TODO-LIST-TICKET',
          payload: reorderTicketColumn(
            todoTicketList,
            sourceIndex,
            destination.index
          ),
        });
        return;
      }

      if (destinationColumn === 'done') {
        dispatchTicketList({
          type: 'SET-INPROGRESS-TO-DONE-TICKET',
          payload: toMoveTicketId,
        });

        const sourceIndex = doneTicketList.findIndex(
          (currTicket) => currTicket.id === toMoveTicketId
        );

        dispatchTicketList({
          type: 'REORDER-DONE-LIST-TICKET',
          payload: reorderTicketColumn(
            doneTicketList,
            sourceIndex,
            destination.index
          ),
        });
      }
      return;
    }

    if (sourceColumn === 'done') {
      toMoveTicket = todoTicketList.at(source.index);

      if (toMoveTicket === undefined) {
        return;
      }

      toMoveTicketId = toMoveTicket.id;

      if (destinationColumn === 'todo') {
        dispatchTicketList({
          type: 'SET-DONE-TO-TODO-TICKET',
          payload: toMoveTicketId,
        });

        const sourceIndex = todoTicketList.findIndex(
          (currTicket) => currTicket.id === toMoveTicketId
        );
        dispatchTicketList({
          type: 'REORDER-TODO-LIST-TICKET',
          payload: reorderTicketColumn(
            todoTicketList,
            sourceIndex,
            destination.index
          ),
        });
        return;
      }

      if (destinationColumn === 'inProgress') {
        dispatchTicketList({
          type: 'SET-DONE-TO-INPROGRESS-TICKET',
          payload: toMoveTicketId,
        });

        const sourceIndex = inProgressTicketList.findIndex(
          (currTicket) => currTicket.id === toMoveTicketId
        );
        dispatchTicketList({
          type: 'REORDER-INPROGRESS-LIST-TICKET',
          payload: reorderTicketColumn(
            inProgressTicketList,
            sourceIndex,
            destination.index
          ),
        });
      }
      return;
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
              ticketList={todoTicketList
                .concat(inProgressTicketList)
                .concat(doneTicketList)}
              onAddTicket={onAddTicket}
            />
          )}
          {contentID === 'viewTicket' && sidePanelTicket !== undefined && (
            <TicketView
              onClick={onClickOnEditTicket}
              ticket={sidePanelTicket}
              assigne={userList.find(
                (user) => user.id === sidePanelTicket.assigneId
              )}
              parentTicket={ticketList.find(
                (ticket) => ticket.id === sidePanelTicket.parentId
              )}
              childTicket={ticketList.find(
                (ticket) => ticket.id === sidePanelTicket.childId
              )}
              tag={tagList.find((tag) => tag.name === sidePanelTicket.tagName)}
            />
          )}
          {contentID === 'editTicket' && sidePanelTicket !== undefined && (
            <EditTicketForm
              ticket={sidePanelTicket}
              userList={userList}
              tagList={tagList}
              ticketList={ticketList}
              onEditTicket={onEditTicket}
            />
          )}
        </SidePanel>
      </main>
    </>
  );
};
