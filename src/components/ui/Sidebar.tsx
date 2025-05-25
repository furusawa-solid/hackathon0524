import { Button } from '@headlessui/react';
import { DogSphereForm } from '../../features/dialogueCounter/DogSphereForm';

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <div
      className={`absolute top-0 z-10 h-full w-[300px] bg-[#111] p-5 text-white transition-all duration-300 ${isOpen ? 'left-0' : '-left-[300px]'}
      `}
    >
      <DogSphereForm />
      <Button onClick={onClose} style={{ marginTop: 10 }}>
        Close
      </Button>
    </div>
  );
};
