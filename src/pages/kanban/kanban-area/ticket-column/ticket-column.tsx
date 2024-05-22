import { FunctionComponent } from 'react';
import { TicketCard } from './ticket-card/ticket-card';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Ticket } from '@model/ticket/ticket.type';
import { ColumnType } from '@model/column/column-type.type';
import { Tag } from '@model/tag/tag.type';
import { User } from '@model/user/user.type';
import { TicketCardStatus } from '@model/column/ticket-card-status.type';
import { AddTicketButton } from './add-ticket-button/add-ticket-button';
import { Image } from '@model/image/image.type';

type TicketColumnProps = {
  type: ColumnType;
  ticketList: Ticket[];
  userList: User[];
  tagList: Tag[];
  imageList: Image[];
  onClickOnCard: (ticket: Ticket) => void;
  onClickOnAdd: (type: ColumnType) => void;
  onMouseEnter: (ticket: Ticket) => void;
  onMouseLeave: () => void;
  focusedTicket: Ticket | null;
  isDropDisabled?: boolean;
};

export const TicketColumn: FunctionComponent<TicketColumnProps> = ({
  type,
  ticketList,
  userList,
  tagList,
  imageList,
  onClickOnAdd,
  onClickOnCard,
  onMouseEnter,
  onMouseLeave,
  focusedTicket,
  isDropDisabled,
}) => {
  const onClickAddTicketButton = () => {
    onClickOnAdd(type);
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
      <h1 className="capitalize text-xl font-medium mb-4">{type}</h1>
      <Droppable droppableId={type} isDropDisabled={isDropDisabled}>
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
                assigneImage={((): Image | undefined => {
                  const user = userList.find(
                    (currentUser) => currentUser.id === ticket.assigneId,
                    ticket
                  );
                  return imageList.find((image) => image.id === user?.imageId);
                })()}
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
