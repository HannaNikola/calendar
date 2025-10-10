export interface CalendarTodo {
  _id: string;
  title?: string;
  description?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
  start?: string | Date | null;
  end?: string | Date | null;
  allDay?: boolean;
  eventId?: string;
}

export interface TodoStateProps {
  todos: CalendarTodo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
