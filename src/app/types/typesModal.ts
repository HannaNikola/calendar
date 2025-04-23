import { CalendarEvent } from "./typesApi";

export interface EventModalProps {
    isOpen: boolean;
    
    onClose: () => void;
    onSubmit: (values: {
      title: string;
      start: Date;
      end: Date;
      allDay: boolean;
      addTask: boolean;
    }) => void;
    slotStart: Date;
    slotEnd: Date;
  }