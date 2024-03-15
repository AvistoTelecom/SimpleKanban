import { FunctionComponent, MouseEvent } from 'react';

type NavBarProps = {
  onNavBar: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const NavBar: FunctionComponent<NavBarProps> = ({ onNavBar }) => {
  return (
    <nav className="navbar bg-base-300">
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={onNavBar}
        value="tag"
      >
        Tags
      </button>
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={onNavBar}
        value="user"
      >
        Users
      </button>
    </nav>
  );
};
