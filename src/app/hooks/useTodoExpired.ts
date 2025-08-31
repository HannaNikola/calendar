import dayjs from "dayjs";

export const useTodoExpired = (end: string | Date | null) =>{

    if(!end) return false

    return dayjs(end).isBefore(dayjs())
}

