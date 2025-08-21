import { CalendarEvent } from "./typesApi";

export type ModalEventType = "new" | "update";


export interface EventModalProps {
  isOpen: boolean;
  type?: ModalEventType;
  onClose: () => void;
  handelAddEvent: (eventData: CalendarEvent) => void;
  handelUpdateEvent?: (eventData: CalendarEvent) => void;
  handleDeleteEvent?: () => void;
  slotStart?: Date | string | null ;
  slotEnd?: Date | string | null ;
  selectedEvent?: CalendarEvent | null;
}

export interface ModalStateProps {
  isModalOpen: boolean;
  modalType: ModalEventType | undefined;
  selectedEvent: CalendarEvent | null;
  slotStart?: Date | string | null;
  slotEnd?: Date | string | null;
  addTask?: boolean;
}
