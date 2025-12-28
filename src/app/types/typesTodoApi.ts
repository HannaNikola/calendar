export interface CalendarTodo {
  _id: string;
  title?: string;
  description?: string;
  isImportant?: boolean;
  addTask?: boolean;
  isCompletedTask?: boolean;
  start?: string | Date | null;
  end?: string | Date | null;
  allDay?: boolean;
  eventId?: string;
  isOverdue?: boolean;
}

export interface TodoStateProps {
  todos: CalendarTodo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
