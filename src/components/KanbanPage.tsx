import { FunctionComponent, useState, MouseEvent } from 'react';
import { KanbanArea } from './KanbanArea';
import { SidePanel } from './SidePanel';
import { NavBar } from './NavBar';

export const KanbanPage: FunctionComponent = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  const [contentID, setContentID] = useState('');

  const handleNavBar = (e: MouseEvent<HTMLButtonElement>) => {
    const id: string = e.currentTarget.value;
    if (contentID === '') {
      setSidePanelOpen(!sidePanelOpen);
      setContentID(id);
      return;
    }

    if (contentID === id) {
      setSidePanelOpen(!sidePanelOpen);
      setContentID('');
    } else {
      setContentID(id);
    }
  };

  return (
    <>
      <NavBar handleNavBar={handleNavBar} />
      <main className="flex-grow h-96 flex w-full space-x-2 p-2 bg-base-300">
        <KanbanArea />
        {sidePanelOpen && <SidePanel content={contentID} />}
      </main>
    </>
  );
};
