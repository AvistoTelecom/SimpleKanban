import { FunctionComponent } from 'react';

type NavBarProps = {
  toggleTagTable: () => void;
  toggleUserTable: () => void;
};

export const NavBar: FunctionComponent<NavBarProps> = ({
  toggleTagTable,
  toggleUserTable,
}) => {
  const onClickUserButton = () => {
    toggleUserTable();
  };

  const onClickTagButton = () => {
    toggleTagTable();
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
