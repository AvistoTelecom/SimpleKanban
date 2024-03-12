import { FunctionComponent } from 'react';
import { UserTable } from './UserTable';

export const SidePanel: FunctionComponent = () => {
  return (
    <div className="w-full h-full bg-base-100 rounded-box p-2">
      <UserTable />
    </div>
  );
};
