import { FunctionComponent, PropsWithChildren } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';

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
        'transition-width duration-300 ease-out h-full bg-base-100 ' +
        (isOpen ? 'w-full rounded-box p-2' : 'w-0')
      }
    >
      <button
        type="button"
        className="btn btn-square hover:text-error"
        title="Close"
        onClick={closePanel}
      >
        <XMarkIcon />
      </button>
      {children}
    </div>
  );
};
