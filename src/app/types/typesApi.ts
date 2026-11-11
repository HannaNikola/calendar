import { CalendarTodo } from "./typesTodoApi";

export interface CalendarEvent {
  _id?: string;
  title: string;
  start?: string | Date | null;
  end?: string | Date | null;
  allDay?: boolean;
  addTask?: boolean;
  isCompletedTask: boolean;
  todoIds?: CalendarTodo[];
  colorEvent?: "none" | "home" | "work" | "isektor";
  repeat?: "none" | "daily" | "workday" | "weekend";
  reminder?: {
    triggerBefore?: "30min" | "1hour" | "1day" | "none";
    notifyAt?: Date | null;
    notified?: boolean;
  };
}

export interface EventStateProps {
  events: CalendarEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface EventUpdatePayload
  extends Partial<Omit<CalendarEvent, "_id" | "todoIds">> {
  todoUpdates?: Partial<Omit<CalendarTodo, "_id" | "eventId">> &
    {
      id: string;
    }[];
}


