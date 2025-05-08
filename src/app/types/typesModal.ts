
import { CalendarEvent } from "./typesApi";

export type ModalType = 'new' | 'update'

export interface EventModalProps {
    isOpen: boolean;
    type?: ModalType 
    onClose: () => void;
    handelAddEvent: (eventData: CalendarEvent) => void;
    handelUpdateEvent: (eventData: CalendarEvent) => void;
    handleDeleteEvent:() => void
    slotStart?: Date;
    slotEnd?: Date;
    selectedEvent?: CalendarEvent | null | undefined
  }




