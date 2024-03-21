import { FunctionComponent } from 'react';
import { Ticket } from '../model/Ticket';
import { User } from '../model/User';
import { Tag } from '../model/Tag';
import { getTextColor } from '../utils/color.utils';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

type TicketCardProps = {
  index: number;
  ticket: Ticket;
  assigne?: User;
  tag?: Tag;
};

export const TicketCard: FunctionComponent<TicketCardProps> = ({
  index,
  ticket,
  assigne,
  tag,
}) => {
  const tagStyle = {
    backgroundColor: tag?.color,
  };

  const textTagStyle = {
    color: getTextColor(tag?.color),
  };

  return (
    <Draggable draggableId={'draggable-' + ticket.id} index={index}>
      {(provided: DraggableProvided) => (
        <li
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="card bg-base-100 shadow-xl w-11/12 mt-4"
        >
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
