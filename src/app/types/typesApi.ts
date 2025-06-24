 export interface CalendarEvent {
    _id?: string
    title: string;
    allDay?: boolean;
    addTask?: boolean;
    start?:Date | string ;
    end?:Date | string ;
    
  }
  


  export interface EventState {
    events: CalendarEvent[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }
 