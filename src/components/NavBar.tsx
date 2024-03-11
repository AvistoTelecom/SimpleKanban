import { FunctionComponent, MouseEvent } from 'react';

interface NavBarProps {
  handleNavBar: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const NavBar: FunctionComponent<NavBarProps> = ({ handleNavBar }) => {
  return (
    <nav className="navbar bg-base-300">
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={handleNavBar}
        value="tag"
      >
        Tags
      </button>
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={handleNavBar}
        value="user"
      >
        Users
      </button>
    </nav>
  );
};
