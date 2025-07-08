
import { CalendarEvent } from "./typesApi";

export type ModalType = 'new' | 'update'

export interface EventModalProps {
    isOpen: boolean;
    type?: ModalType 
    onClose: () => void;
    handelAddEvent: (eventData: CalendarEvent) => void;
    handelUpdateEvent: (eventData: CalendarEvent) => void;
    handleDeleteEvent:() => void
    slotStart?: Date | null ;
    slotEnd?: Date | null ;
    selectedEvent?: CalendarEvent | null 
  }


export interface ModalStateProps {
  isModalOpen: boolean;
  modalType: ModalType | undefined;
  selectedEvent: CalendarEvent | null;
  slotStart?: Date | null ;
  slotEnd?: Date | null ;
}

