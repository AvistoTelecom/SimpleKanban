import {FunctionComponent} from 'react'

interface NavBarProps {
  handleNavBar: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const NavBar: FunctionComponent<NavBarProps> = (props) => {
  return (
    <nav className="navbar bg-base-100">
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={props.handleNavBar}
        value="tag"
      >
        Tags
      </button>
      <button
        type="button"
        className="btn btn-ghost text-xl"
        onClick={props.handleNavBar}
        value="user"
      >
        Users
      </button>
    </nav>
  )
}
