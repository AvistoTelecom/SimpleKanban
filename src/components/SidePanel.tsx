import { FunctionComponent } from 'react';
import { UsersTable } from './tables/users/UsersTable';
import { TagsTable } from './tables/tags/TagsTable';

interface SidePanelProps {
  content: string;
}

export const SidePanel: FunctionComponent<SidePanelProps> = ({ content }) => {
  return (
    <div className="w-full h-full bg-base-100 rounded-box p-2">
      {content === 'tag' ? (
        <TagsTable />
      ) : content === 'user' ? (
        <UsersTable />
      ) : null}
    </div>
  );
};
