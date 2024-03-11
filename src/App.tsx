import {Routes, Route, Navigate} from 'react-router-dom'
import {KanbanPage} from './components/KanbanPage'
export const App = (): React.JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<KanbanPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
