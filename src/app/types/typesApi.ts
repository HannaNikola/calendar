export interface CalendarEvent {
  _id?: string;
  title: string;
  description?: string;
  start?: string | Date | null;
  end?: string | Date | null;
  allDay?: boolean;
  addTask?: boolean;
  isCompletedTask: boolean;
  todoId?: string | null;
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
