import { FunctionComponent } from 'react';
import { AddTicketButton } from './AddTicketButton';
import { ColumnType, SidePanelContent } from './KanbanPage';
import { TicketCard } from './TicketCard';
import { Ticket } from '../model/Ticket';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { TicketCardStatus } from '../model/TicketCardStatus';
import { User } from '../model/User';
import { Tag } from '../model/Tag';

type TicketColumnProps = {
  type: ColumnType;
  ticketList: Ticket[];
  userList: User[];
  tagList: Tag[];
  onClickOnCard: (id: SidePanelContent, ticketId: string) => void;
  onClickOnAdd: (id: SidePanelContent, type: ColumnType) => void;
  onMouseEnter: (ticket: Ticket) => void;
  onMouseLeave: () => void;
  focusedTicket?: Ticket;
};

export const TicketColumn: FunctionComponent<TicketColumnProps> = ({
  type,
  ticketList,
  userList,
  tagList,
  onClickOnAdd,
  onClickOnCard,
  onMouseEnter,
  onMouseLeave,
  focusedTicket,
}) => {
  const onClickAddTicketButton = () => {
    onClickOnAdd('addTicket', type);
  };

  const getStatus = (ticket: Ticket): TicketCardStatus => {
    if (!focusedTicket) {
      return 'neutral';
    }
    if (focusedTicket.id === ticket.id) {
      return 'focus';
    }
    if (focusedTicket.childId === ticket.id) {
      return 'focusChild';
    }
    if (focusedTicket.parentId === ticket.id) {
      return 'focusParent';
    }
    return 'hide';
  };

  return (
    <div className="flex-1 flex flex-col bg-base-200 place-items-center min-w-60 h-full rounded-box overflow-hidden pt-5">
      <Droppable droppableId={type}>
        {(provided: DroppableProvided) => (
          <ul
            ref={provided.innerRef}
            className="w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden"
            {...provided.droppableProps}
          >
            {ticketList.map((ticket: Ticket, index) => (
              <TicketCard
                key={'draggable-' + ticket.id}
                index={index}
                ticket={ticket}
                status={getStatus(ticket)}
                onClick={onClickOnCard}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                assigne={userList.find(
                  (currentUser) => currentUser.id === ticket.assigneId,
                  ticket
                )}
                tag={tagList.find(
                  (currentTag) => currentTag.name === ticket.tagName,
                  ticket
                )}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <AddTicketButton onClick={onClickAddTicketButton} />
    </div>
  );
};
