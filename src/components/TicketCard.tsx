import { FunctionComponent } from 'react';
import { Ticket } from '../model/Ticket';
import { User } from '../model/User';
import { Tag } from '../model/Tag';

type TicketCardProps = {
  ticket: Ticket;
  assigne?: User;
  tag?: Tag;
};

export const TicketCard: FunctionComponent<TicketCardProps> = ({
  ticket,
  assigne,
  tag,
}) => {
  let tagTextColor = 'white';

  if (tag) {
    const color = tag.color.substring(1, 7);
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
      tagTextColor = 'black';
    }
  }

  const tagStyle = {
    backgroundColor: tag?.color,
  };

  const textTagStyle = {
    color: tagTextColor,
  };

  return (
    <li className="card bg-base-100 shadow-xl w-11/12 mt-4">
      <div className="card-body">
        <div className="flex">
          <h2 className="card-title flex-auto mr-2 line-clamp-1 break-words">
            {ticket.name}
          </h2>
          {tag ? (
            <div
              style={tagStyle}
              className={
                'width-full badge badge-lg line-clamp-1 break-words leading-tight'
              }
            >
              <p style={textTagStyle}>{tag.name}</p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="card-actions justify-between mt-2">
          <div>
            <p className="text-neutral-content">
              <b>Creation :</b> {ticket.creationDate.toLocaleDateString()}
            </p>
            <p className="text-neutral-content">
              <b>Story points :</b> {ticket.storyPoint}
            </p>
          </div>
          {assigne ? (
            <div className="flex tooltip" data-tip={assigne.name}>
              <img
                className="mask mask-squircle w-12 h-12"
                src={assigne.image}
                alt="Avatar"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </li>
  );
};
