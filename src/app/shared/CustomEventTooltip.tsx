import { useState } from "react"
import { CalendarEvent } from "../types/typesApi"

export const CustomEventTooltip = ({event}:{event: CalendarEvent})=>{
    const [show , setShow]= useState(false)

    return (
        <div 
        onMouseEnter={()=> setShow(true)}
        onMouseLeave={()=> setShow(false)}
        className="relative ">
        <div>{event.title}</div>
        {show && (
            <div className="bg-amber-700 ">
                <p></p>
            </div>
        )}
        </div>
    )
}