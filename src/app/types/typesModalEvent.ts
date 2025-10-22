import { CalendarEvent } from "./typesApi";

export interface EventModalProps {
 
  isOpen: boolean;
  onClose: () => void;
  handelAddEvent: (eventData: CalendarEvent) => void;
  handelUpdateEvent?: (eventData: CalendarEvent) => void;
  handleDeleteEvent?: () => void;
  slotStart?: Date | string | null ;
  slotEnd?: Date | string | null ;
  selectedEvent?: CalendarEvent | null;
  addTask?: boolean;
  isImportant?: boolean;
  isCompletedTask?: boolean;
}

