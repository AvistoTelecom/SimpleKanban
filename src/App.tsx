import {Routes, Route} from 'react-router-dom'
import {KanbanPage} from './KanbanPage'
import {NavBar} from './NavBar'
export const App = (): React.JSX.Element => {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<KanbanPage />} />
      </Routes>
    </>
  )
}
