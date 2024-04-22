import { FunctionComponent } from 'react';
import { SidePanelContent } from '../../pages/kanban/kanban-page';

type NavBarProps = {
  onClick: (id: SidePanelContent) => void;
};

export const NavBar: FunctionComponent<NavBarProps> = ({ onClick }) => {
  const onClickUserButton = () => {
    onClick('user');
  };

  const onClickTagButton = () => {
    onClick('tag');
  };

  return (
    <nav className="navbar bg-base-300">
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={onClickTagButton}
        value="tag"
      >
        Tags
      </button>
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={onClickUserButton}
        value="user"
      >
        Users
      </button>
    </nav>
  );
};
