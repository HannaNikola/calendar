export interface CalendarTodo {
  _id: string;
  title: string;
  description?: string;
  isImportant?: boolean;
  isCompletedTask?: boolean;
  start?: string | Date | null;
  end?: string | Date | null;
  eventId?: {
    _id: string;
    title: string;
  } | null;
  isOverdue?: boolean;
}

export interface TodoStateProps {
  todos: CalendarTodo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}









