import { FunctionComponent, PropsWithChildren } from 'react';

export const KanbanArea: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className="flex bg-base-100 rounded-box w-full gap-2 p-2 overflow-x-auto select-none">
      {props.children}
    </div>
  );
};
