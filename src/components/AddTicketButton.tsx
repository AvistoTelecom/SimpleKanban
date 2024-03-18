import { FunctionComponent } from 'react';

type NewTicketButtonProps = {
  onClick: () => void;
};

export const NewTicketButton: FunctionComponent<NewTicketButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-ghost w-full font-bold py-2 px-4 rounded-box rounded-tr-none rounded-tl-none inline-flex gap-2 items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
      </svg>

      <span>Add Ticket</span>
    </button>
  );
};
