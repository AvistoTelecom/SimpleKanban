import { FunctionComponent } from 'react';
import { Ticket } from '../model/Ticket';
import { User } from '../model/User';
import { Tag } from '../model/Tag';
import { getTextColor } from '../utils/color.utils';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { SidePanelContent } from './KanbanPage';
import { TicketCardStatus } from '../model/TicketCardStatus';

type TicketCardProps = {
  index: number;
  ticket: Ticket;
  assigne?: User;
  tag?: Tag;
  status: TicketCardStatus;
  onClick: (id: SidePanelContent, ticketId: string) => void;
  onMouseEnter: (ticket: Ticket) => void;
  onMouseLeave: () => void;
};

export const TicketCard: FunctionComponent<TicketCardProps> = ({
  index,
  ticket,
  assigne,
  tag,
  status,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const tagStyle = {
    backgroundColor: tag?.color,
  };

  const textTagStyle = {
    color: getTextColor(tag?.color),
  };

  const onClickOnCard = () => {
    onClick('viewTicket', ticket.id);
  };

  let backgroundColor: string = 'bg-base-100';
  if (status === 'focus') {
    backgroundColor = 'bg-neutral';
  }
  if (status === 'focusParent' || status === 'focusChild') {
    backgroundColor = 'bg-base-100';
  }

  return (
    <Draggable draggableId={'draggable-' + ticket.id} index={index}>
      {(provided: DraggableProvided) => (
        <li
          onMouseEnter={() => onMouseEnter(ticket)}
          onMouseLeave={() => onMouseLeave()}
          onClick={onClickOnCard}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={
            'card shadow-xl w-11/12 mt-4 relative transition-colors ease-in-out ' +
            backgroundColor
          }
        >
          {status === 'hide' ? (
            <div className="absolute w-full h-full rounded-box bg-hide"></div>
          ) : null}
          {status === 'focusParent' ? (
            <div className="badge badge-neutral absolute top-2 left-2">
              Parent
            </div>
          ) : null}
          {status === 'focusChild' ? (
            <div className="badge badge-neutral absolute top-2 left-2">
              Child
            </div>
          ) : null}
          <div className="card-body">
            <div className="flex">
              <h2 className="card-title flex-auto mr-2 line-clamp-1 break-words">
                {ticket.name}
              </h2>
              {tag && (
                <div
                  style={tagStyle}
                  className={
                    'width-full badge badge-lg line-clamp-1 break-words leading-tight'
                  }
                >
                  <p style={textTagStyle}>{tag.name}</p>
                </div>
              )}
            </div>

            <div className="card-actions justify-between mt-2">
              <div>
                <p className="text-neutral-content">
                  <strong>Creation :</strong>{' '}
                  {ticket.creationDate.toLocaleDateString()}
                </p>
                <p className="text-neutral-content">
                  <strong>Story points :</strong> {ticket.storyPoint}
                </p>
              </div>
              {assigne && (
                <div className="flex tooltip" data-tip={assigne.name}>
                  <img
                    className="mask mask-squircle w-12 h-12"
                    src={assigne.image}
                    alt="Avatar"
                  />
                </div>
              )}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
