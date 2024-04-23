import { FunctionComponent } from 'react';
import { PlusIcon } from '../../../../../components/plus-icon/plus-icon';

type AddTicketButtonProps = {
  onClick: () => void;
};

export const AddTicketButton: FunctionComponent<AddTicketButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-ghost w-full font-bold py-2 px-4 rounded-box rounded-tr-none rounded-tl-none inline-flex gap-2 items-center"
    >
      <PlusIcon />
      <span>Add Ticket</span>
    </button>
  );
};
