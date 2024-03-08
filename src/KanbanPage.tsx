import {KanbanArea} from './KanbanArea'
import {SidePanel} from './SidePanel'

export const KanbanPage = (): React.JSX.Element => {
  return (
    <main className="flex w-full space-x-2 p-2">
      <KanbanArea></KanbanArea>
      <SidePanel></SidePanel>
    </main>
  )
}
