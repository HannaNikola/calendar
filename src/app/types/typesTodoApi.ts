export interface CalendarTodo {
  _id?: string;
  title: string;
  description?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
  end: Date | string | null;
  allDay?: boolean;
  eventId: string;
  repeat?: "none" | "daily" | "weekday" | "weekend";
  reminder?: {
  triggerBefore?: "30min" | "1hour" | "1day" | "none";
  notifyAt?: Date | null;
  notified?: boolean;
  };
}

export interface TodoStateProps {
  todos: CalendarTodo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
