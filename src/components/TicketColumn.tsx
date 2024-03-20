import { FunctionComponent } from 'react';
import { AddTicketButton } from './AddTicketButton';
import { ColumnType, SidePanelContent } from './KanbanPage';

type TicketColumnProps = {
  type: ColumnType;
  onClick: (id: SidePanelContent, type?: ColumnType) => void;
};

export const TicketColumn: FunctionComponent<TicketColumnProps> = ({
  type,
  onClick,
}) => {
  const onClickAddTicketButton = () => {
    onClick('addTicket', type);
  };

  return (
    <div className="flex-1 grid grid-rows-[95%_5%] bg-base-200 place-items-center min-w-60 h-full rounded-box">
      Ticket column
      <AddTicketButton onClick={onClickAddTicketButton} />
    </div>
  );
};
