import { EditIcon } from '@components/edit-icon/edit-icon';
import { SmallTrashIcon } from '@components/trash-icon/trash-icon';
import { Tag } from '@model/tag/tag.type';
import { Ticket } from '@model/ticket/ticket.type';
import { User } from '@model/user/user.type';
import { getTextColor } from '@utils/color.utils';
import {
  isDoneTicket,
  isInProgressTicket,
} from '@utils/tickets-functions.utils';
import { FunctionComponent } from 'react';

type TicketViewProps = {
  ticket: Ticket;
  tag?: Tag;
  assigne?: User;
  childTicket?: Ticket;
  parentTicket?: Ticket;
  onClickOnEditButton: (ticket: Ticket) => void;
  onClickOnDeleteButton: (ticketId: string) => void;
};

export const TicketView: FunctionComponent<TicketViewProps> = ({
  ticket,
  tag,
  assigne,
  parentTicket,
  childTicket,
  onClickOnEditButton,
  onClickOnDeleteButton,
}) => {
  const onClickOnEditTicket = () => {
    onClickOnEditButton(ticket);
  };

  const onClickOnDeleteTicket = () => {
    onClickOnDeleteButton(ticket.id);
  };

  const tagStyle = {
    backgroundColor: tag?.color,
  };

  const textTagStyle = {
    color: getTextColor(tag?.color),
  };

  return (
    <article className="relative flex flex-col gap-4 w-full items-center p-4 overflow-y-auto max-h-full justify-between">
      <button
        type="button"
        onClick={onClickOnDeleteTicket}
        className="absolute top-2 right-2 hover:text-accent hover:bg-base-200 rounded-box p-4"
      >
        <SmallTrashIcon />
      </button>

      <button
        type="button"
        onClick={onClickOnEditTicket}
        className="absolute top-2 right-16 hover:text-accent hover:bg-base-200 rounded-box p-4"
      >
        <EditIcon />
      </button>

      <h2 className="text-xl font-semibold dark:text-white">{ticket.name}</h2>
      {tag && (
        <div
          style={tagStyle}
          className="width-full badge badge-lg line-clamp-1 break-words leading-tight"
        >
          <p style={textTagStyle}>{tag.name}</p>
        </div>
      )}
      <div className="lg:flex gap-4 mt-4 w-full">
        <div className="lg:w-2/3">
          <p className="text-neutral-content">
            <strong>Created at : </strong>
            {ticket.creationDate.toLocaleDateString()}
          </p>
          {isInProgressTicket(ticket) && (
            <p className="text-neutral-content">
              <strong>Stated at : </strong>
              {ticket.startDate.toLocaleDateString()}
            </p>
          )}
          {isDoneTicket(ticket) && (
            <p className="text-neutral-content">
              <strong>Stated at : </strong>
              {ticket.endDate.toLocaleDateString()}
            </p>
          )}
          <h3 className="mt-3 text-lg font-semibold dark:text-white">
            Description :
          </h3>
          <textarea
            className="w-full textarea resize-none mt-4"
            value={ticket.description}
            readOnly
          ></textarea>
        </div>
        <div className="bg-neutral h-max rounded-box p-4 lg:w-1/3 mt-4 lg:mt-0 flex flex-col gap-2">
          <p>
            <strong>Blocked : </strong>
            {String(ticket.blocked)}
          </p>
          <p>
            <strong>Story points : </strong>
            {ticket.storyPoint}
          </p>
          {assigne ? (
            <div className="flex items-center">
              <p className="mr-2">
                <strong>Assignee : </strong>
              </p>
              <div className="flex tooltip" data-tip={assigne.name}>
                <img
                  className="mask mask-squircle w-12 h-12"
                  src={assigne.image}
                  alt="Avatar"
                />
              </div>
            </div>
          ) : (
            <p>
              <strong>Assignee : </strong> ---
            </p>
          )}
          <p>
            <strong>Child ticket : </strong>
            {childTicket ? childTicket.name : '---'}
          </p>
          <p>
            <strong>Parent Ticket : </strong>
            {parentTicket ? parentTicket.name : '---'}
          </p>
        </div>
      </div>
    </article>
  );
};
