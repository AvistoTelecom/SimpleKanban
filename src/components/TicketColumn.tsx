import { FunctionComponent } from 'react';
import { AddTicketButton } from './AddTicketButton';
import { ColumnType, SidePanelContent } from './KanbanPage';
import { TicketCard } from './TicketCard';
import { Ticket } from '../model/Ticket';
import { User } from './context/UserContext';
import { Tag } from './context/TagContext';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

type TicketColumnProps = {
  type: ColumnType;
  ticketList: Ticket[];
  userList: User[];
  tagList: Tag[];
  onClick: (id: SidePanelContent, type?: ColumnType) => void;
};

export const TicketColumn: FunctionComponent<TicketColumnProps> = ({
  type,
  ticketList,
  userList,
  tagList,
  onClick,
}) => {
  const onClickAddTicketButton = () => {
    onClick('addTicket', type);
  };

  return (
    <div className="flex-1 flex flex-col bg-base-200 place-items-center min-w-60 h-full rounded-box overflow-hidden">
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
