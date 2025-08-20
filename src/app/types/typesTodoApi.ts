export interface TodoProps {
            _id?: string;
            title: string,
            description?: string,
            isImportant?: boolean,
            isCompleted?: boolean,
            end: Date | string | null;
            allDay?: boolean;
            eventId: string,
            repeat?: string,
            reminder?: string,
}

export  interface TodoStateProps {
    todos: TodoProps[],
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    
 }