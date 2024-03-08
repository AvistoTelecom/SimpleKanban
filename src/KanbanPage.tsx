import {KanbanArea} from './KanbanArea'
import {NavBar} from './NavBar'

export const KanbanPage = (): React.JSX.Element => {
  return (
    <main>
      <NavBar></NavBar>
      <KanbanArea></KanbanArea>
    </main>
  )
}
