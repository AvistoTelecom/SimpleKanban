import { XMarkIcon } from '@components/x-mark-icon/x-mark-icon';
import { FunctionComponent, PropsWithChildren } from 'react';

type SidePanelProps = {
  isOpen: boolean;
  closePanel: () => void;
};

export const SidePanel: FunctionComponent<
  PropsWithChildren<SidePanelProps>
> = ({ children, isOpen, closePanel }) => {
  return (
    <div
      className={
        'flex flex-col transition-width duration-300 ease-out h-full bg-base-100 overflow-x-hidden rounded-box ' +
        (isOpen ? 'w-full p-2' : 'w-0')
      }
    >
      <button
        type="button"
        className={
          'btn btn-square hover:text-error' + (isOpen ? '' : ' hidden')
        }
        title="Close"
        onClick={closePanel}
      >
        <XMarkIcon />
      </button>
      {children}
    </div>
  );
};
