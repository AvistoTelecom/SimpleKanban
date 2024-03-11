import {Routes, Route} from 'react-router-dom'
import {KanbanPage} from './KanbanPage'
export const App = (): React.JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<KanbanPage />} />
      </Routes>
    </>
  )
}
