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
        className="p-2 hover:bg-base-200 hover:text-error rounded-lg"
        title="Close"
        onClick={closePanel}
      >
        <XMarkIcon />
      </button>
      {children}
    </div>
  );
};
