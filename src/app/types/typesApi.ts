 export interface CalendarEvent {
    _id?: string
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    addTask: boolean;
    
  }
  
  export interface EventState {
    events: CalendarEvent[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }
 