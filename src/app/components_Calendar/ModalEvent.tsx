import * as Yup from "yup";
import { EventModalProps } from "@/app/types/typesModal";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarEvent } from "../types/typesApi";

const EventSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "short")
    .max(30, "long")
    .required("title can`t be empty"),
});

export const ModalEvent = ({
  type = "new",
  selectedEvent,
  isOpen,
  onClose,
  handleDeleteEvent,
  handelAddEvent,
  handelUpdateEvent,
  slotStart,
  slotEnd,
}: EventModalProps) => {
  

  const[title, setTitle]= useState('')
  const isNew = type === "new";

  useEffect(()=>{
    setTitle(selectedEvent?.title || "")
  },[selectedEvent])

  if (!isOpen) return null;
  
  const handleSubmit = ()=>{
    const eventData: CalendarEvent = {
      ...selectedEvent,
      title,
      start: slotStart,
      end: slotEnd,
      allDay: false
    }

    isNew ? handelAddEvent(eventData) : handelUpdateEvent(eventData)
  }


  

  return (
    <div className=" flex fixed inset-0 bg-black/50  items-center justify-center z-50 shadow-2xs">
      <div className=" p-4 rounded-lg min-w-[400px] bg-white">
        <div className="flex ">
          {isNew ? (
            <h1 className="flex-1 text-center  text-black mb-6">
              Create event
            </h1>
          ) : (
            <h1 className="flex-1 text-center  text-black mb-6">
              Update event
            </h1>
          )}

          <button className="flex" onClick={onClose}>
            {" "}
            <X size={15} />
          </button>
        </div>

        <div className="flex flex-col ">
          <textarea
         value={title}
         onChange={(e) => setTitle(e.target.value)}
            className="border-none rounded bg-sky-100 focus:outline-none focus:bg-sky-200 p-2 mb-3 text-black placeholder:text-gray resize-none overflow-hidden min-h-[40px]"
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
          <div className="flex justify-between mb-8 ">
            <div className="flex items-center">
              <label className="flex text-black mr-2">All day event</label>
              <input 
              
              type="checkbox" name="allDay" />
            </div>
            <div className="flex items-center">
              <label 
              className="mr-2">Add Task</label>
              <input 
              
              type="checkbox" name="addTask" />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          {isNew && (
            <button 
            onClick={handleSubmit}
            className="w-[50px] text-sky-950" type="submit">
            Save
          </button>)}
          
          {!isNew && (
            <>
            <button
           onClick={handleSubmit}
             className="w-[50px] text-sky-950" type="submit">
              Update
            </button>
            <button
            onClick={handleDeleteEvent}
             type="button" className="w-[50px] text-red-700">
            Delete
          </button>
            </>
            )}

        </div>
      </div>
    </div>
  );
};
