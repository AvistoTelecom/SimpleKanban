import { FunctionComponent, MouseEvent } from 'react';

type NavBarProps = {
  onClickNavbar: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const NavBar: FunctionComponent<NavBarProps> = ({ onClickNavbar }) => {
  return (
    <nav className="navbar bg-base-300">
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={onClickNavbar}
        value="tag"
      >
        Tags
      </button>
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={onClickNavbar}
        value="user"
      >
        Users
      </button>
    </nav>
  );
};
