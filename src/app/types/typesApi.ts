export interface CalendarEvent {
  _id?: string;
  title: string;
  description?: string;
  addTask?: boolean;
  repeat?: "none" | "daily" | "weekday" | "weekend"; // заглушка
  reminder?: {
    triggerBefore?: "30min" | "1hour" | "1day" | "none"; // заглушка
    notifyAt?: Date | null;
    notified?: boolean;
  };
  start?: string | Date | null;
  end?: string | Date | null;
  allDay?: boolean;
}

export interface EventStateProps {
  events: CalendarEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
