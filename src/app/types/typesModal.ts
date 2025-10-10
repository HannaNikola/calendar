import { CalendarEvent } from "./typesApi";
import { CalendarTodo } from "./typesTodoApi";

export type ModalType = "event" | "todo";
export type ModalMode = "new" | "update";

export interface ModalData {
  event?: CalendarEvent | null;
  todo?: CalendarTodo | null;
  slotStart?: Date | string | null;
  slotEnd?: Date | string | null;
  selectedId?: string | null;
}

export interface ModalState {
  isOpen: boolean;
  type?: ModalType | null;
  mode?: ModalMode | null;
  data?: ModalData | null;
}
