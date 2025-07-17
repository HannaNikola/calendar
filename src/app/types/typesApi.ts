export interface CalendarEvent {
  _id?: string;
  title: string;
  allDay?: boolean;
  addTask?: boolean;
  start?: string | Date | null;
  end?: string | Date | null;
}

export interface EventStateProps {
  events: CalendarEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
