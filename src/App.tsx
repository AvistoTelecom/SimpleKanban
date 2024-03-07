import './App.css'
import {Routes, Route} from 'react-router-dom'
import {KanbanPage} from './KanbanPage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<KanbanPage />} />
    </Routes>
  )
}
