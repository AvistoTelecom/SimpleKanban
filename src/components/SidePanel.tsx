import { FunctionComponent, PropsWithChildren } from 'react';

export const SidePanel: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className="w-full h-full bg-base-100 rounded-box p-2">
      {props.children}
    </div>
  );
};
