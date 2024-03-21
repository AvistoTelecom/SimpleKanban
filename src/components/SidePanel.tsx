import { FunctionComponent, PropsWithChildren } from 'react';

type SidePanelProps = {
  isOpen: boolean;
};

export const SidePanel: FunctionComponent<
  PropsWithChildren<SidePanelProps>
> = ({ children, isOpen }) => {
  return (
    <div
      className={
        'transition-width duration-300 ease-out h-full bg-base-100 ' +
        (isOpen ? 'w-full rounded-box p-2' : 'w-0')
      }
    >
      {children}
    </div>
  );
};
