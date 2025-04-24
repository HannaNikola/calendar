
import { CalendarEvent } from "./typesApi";

export type ModalType = 'new' | 'update'

export interface EventModalProps {
    isOpen: boolean;
    type?: ModalType 
    onClose: () => void;
    handleDeleteEvent:() => void
    onSubmit: (values: {
      title: string;
      start: Date;
      end: Date;
      allDay: boolean;
      addTask: boolean;
    }) => void;
    slotStart: Date;
    slotEnd: Date;
    selectedEvent?: CalendarEvent | null | undefined
  }




