import { CalendarEvent } from "./typesApi";
import { CalendarTodo } from "./typesTodoApi";

export type ModalType = "event" | "todo";

export type ModalModeMap = {
  event: "new" | "update";
  todo: "newTodo" | "editTodo";
};

export type ModalMode<T extends ModalType> = ModalModeMap[T];

export interface ModalData {
  event?: CalendarEvent | null;
  todo?: CalendarTodo | null;
  slotStart?: Date | string | null;
  slotEnd?: Date | string | null;
  selectedId?: string | null;
}

export interface ModalState<T extends ModalType = ModalType> {
  isOpen: boolean;
  type?: T | null;
  mode?: ModalMode<T> | null;
  data?: ModalData | null;
}

export type ModalPayload =
  | { type: "event"; mode: ModalModeMap["event"]; data?: ModalData }
  | { type: "todo"; mode: ModalModeMap["todo"]; data?: ModalData }
  | { type: null; mode?: null; data?: null };
