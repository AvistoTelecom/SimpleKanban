import { FunctionComponent } from 'react';
import { AddTicketButton } from './AddTicketButton';
import { ColumnType, SidePanelContent } from './KanbanPage';
import { TicketCard } from './TicketCard';
import { Ticket } from '../model/Ticket';
import { User } from './context/UsersContext';
import { Tag } from './context/TagsContext';

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
    <div className="flex-1 grid grid-rows-[95%_5%] bg-base-200 place-items-center min-w-60 h-full rounded-box ">
      <ul className="w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
        {ticketList.map((ticket: Ticket) => (
          <TicketCard
            ticket={ticket}
            assigne={userList.find(
              (currentUser) => currentUser.id === ticket.assigneId
            )}
            tag={tagList.find(
              (currentTag) => currentTag.name === ticket.tagName
            )}
          />
        ))}
      </ul>
      <AddTicketButton onClick={onClickAddTicketButton} />
    </div>
  );
};
