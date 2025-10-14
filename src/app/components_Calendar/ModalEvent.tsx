"use client";

import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { CalendarEvent } from "../types/typesApi";
import "flatpickr/dist/themes/airbnb.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components_Calendar/calendar.css";
import { Button } from "@/app/shared/ui/Button";
import { toast, ToastContainer } from "react-toastify";
import { useEventHandlers } from "../hooks/useEventHandlers";
import { toDate } from "../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { addTodoApi } from "../api/todoApi";
import { AppDispatch, RootState } from "../store/store";
import { ModalWrapper } from "../shared/ui/ModalWrapper";
import { EventModalProps } from "../types/typesModalEvent";
import { closeElementModal } from "../store/sharedComponent/modalReducer";

const EventSchema = Yup.object().shape({
  title: Yup.string()
    .max(70, "Title must be less than 100 characters")
    .required("title can`t be empty"),
});



export const ModalEvent = ({
  onClose,
  slotStart,
  slotEnd,
  selectedEvent,
}: EventModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { mode, isOpen } = useSelector((state: RootState) => state.modal);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [endDay, setEndDay] = useState<Date | null>(null);
  const [allDay, setAllDay] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const isNew = mode === "new";
  const desRef = useRef<HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  

  const { handelAddEvent, handleDeleteEvent, handelUpdateEvent } =
    useEventHandlers();

    useEffect(() => {
    if (isOpen) {
      const adjustHeight = (el: HTMLTextAreaElement | null) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      };
      adjustHeight(titleRef.current);
      adjustHeight(desRef.current);
    }
  }, [isOpen, title, description]); 

  
  useEffect(() => {
    const now = new Date();
    const start = toDate(selectedEvent?.start ?? slotStart ?? now);
    const end = toDate(selectedEvent?.end ?? slotEnd ?? now);

    if (!start) return;

    setTitle(selectedEvent?.title ?? "");
    setDescription(selectedEvent?.description ?? "")
    setAllDay(selectedEvent?.allDay ?? false);
    setAddTask(selectedEvent?.addTask ?? false)
    setStartDay(start);

    if (selectedEvent?.start) {
      setStartTime(new Date(start.getHours(), start.getMinutes()));
    } else {
      setStartTime(new Date());
    }

    if (isNew) {
      setEndDay(start);

      setEndTime(new Date());
    } else if (end) {
      setEndDay(end);
      setEndTime(new Date(end.getHours(), end.getMinutes()));
    } else {
      setEndTime(new Date());
    }
  }, [selectedEvent, slotStart, slotEnd, isNew]);

  const combineDateTime = (
    date: Date | null,
    time: Date | null
  ): Date | null => {
    if (!date || !time) return null;
    const result = new Date(date);
    result.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return result;
  };

  const handleStartDayChange = (date: Date | null) => {
    setStartDay(date);

    if (date && isNew) {
      setEndDay(date);
    }
  };

  // const handleStartTimeChange = (time: Date | null) => {
  //   setStartTime(time);
  //   if (time && isNew) {
  //     const oneHourLater = new Date(
  //       1970,
  //       0,
  //       1,
  //       time.getHours() + 1,
  //       time.getMinutes()
  //     );
  //     setEndTime(oneHourLater);
  //   }
  // };
  const handleStartTimeChange = (time: Date | null) => {
    setStartTime(time);
    if (time && isNew) {
      const oneHourLater = new Date(
        1970,
        0,
        1,
        time.getHours() + 1,
        time.getMinutes()
      );
      setEndTime(oneHourLater);
    }
  };

  // const handleEndDayChange = (date: Date | null) => {
  //   setEndDay(date);
  //   if (date && startTime) {
  //     setEndTime(
  //       new Date(1970, 0, 1, startTime.getHours() + 1, startTime.getMinutes())
  //     );
  //   }
  // };

  const handleEndDayChange = (date: Date | null) => {
    setEndDay(date);
    if (date && startTime) {
      setEndTime(new Date(startTime.getHours() + 1, startTime.getMinutes()));
    }
  };

  const handleSubmit = async () => {
    try {
      await EventSchema.validate({ title });

      const start = combineDateTime(startDay, startTime);
      const end = combineDateTime(endDay, endTime);

      if (!start || !end) {
        return;
      }

      const eventData: CalendarEvent = {
        ...selectedEvent,
        description,
        title,
        start,
        end,
        allDay,
        addTask,
      };

      const createdEvent = isNew
        ? await handelAddEvent(eventData)
        : await handelUpdateEvent(eventData);

      if (addTask && createdEvent?._id) {
        await dispatch(
          addTodoApi({
            title: createdEvent.title,
            description: createdEvent.description,
            isImportant: false,
            isCompleted: false,
            end: createdEvent.end,
            allDay: createdEvent.allDay,
            eventId: createdEvent._id
            
          })
        );
      }
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };


  if (!isOpen) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      className=" min-w-[300px] lg:min-w-[500px]"
    >
      <div className="flex">
        {isNew ? (
          <h1 className="flex-1 text-center  text-h2 mb-6">Create event</h1>
        ) : (
          <h1 className="flex-1 text-center  text-main mb-6">Update event</h1>
        )}
      </div>

      <div className="flex flex-col ">
        <ToastContainer />
        <textarea
          required
          ref={titleRef}
          value={title}
          placeholder="write your title maximum 100 characters..."
          onChange={(e) => setTitle(e.target.value)}
          className="border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main placeholder:text-gray resize-none overflow-hidden min-h-[40px] shadow-lg"
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />

        <div className="mb-4 w-full">
          <div className="flex flex-1  mb-2 gap-2 w-full ">
            <DatePicker
              selected={startDay}
              onChange={handleStartDayChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select the day"
              className=" w-[150px] lg:w-[250px] rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
            />
            <DatePicker
              selected={startTime}
              onChange={handleStartTimeChange}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Время"
              placeholderText="Select the time"
              className="rounded w-[150px] lg:w-[250px] bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
            />
          </div>
          <div className="flex flex-1 mb-2 gap-2">
            <DatePicker
              selected={endDay}
              onChange={handleEndDayChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select the day"
              className=" w-[150px] lg:w-[250px] rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
            />
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Time"
              placeholderText="Select the time"
              className=" w-[150px] lg:w-[250px] rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mb-8 ">
          <div className="flex items-center justify-center ">
            <label className="flex text-main mr-2">All day event</label>
            <input
              type="checkbox"
              name="allDay"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="appearance-none w-4 h-4 border-[1px] border-gray-400 rounded checked:bg-checkboks checked:border-checkboks relative before:content-[''] before:absolute before:inset-0 
             before:flex before:items-center before:justify-center 
             checked:before:content-['✓'] checked:before:text-white 
             text-sm cursor-pointer transition"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="mr-2 text-main">Add Task</label>
            <input
              type="checkbox"
              name="addTask"
              checked={addTask}
              onChange={(e)=>setAddTask(e.target.checked)}
              className="appearance-none w-4 h-4 border-[1px] border-gray-400 rounded checked:bg-checkboks checked:border-checkboks relative before:content-[''] before:absolute before:inset-0 
             before:flex before:items-center before:justify-center 
             checked:before:content-['✓'] checked:before:text-white 
             text-sm cursor-pointer transition"
            />
          </div>
        </div>
        { addTask &&  (
          <textarea
          ref={desRef}
          placeholder="Type your description maximum 600 characters ..."
          value={description}
          maxLength={600}
          onChange={(e) => setDescription(e.target.value)}
          className="border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main text-justify  placeholder:text-gray resize-none overflow-hidden min-h-[40px] line-clamp-2 "
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
         )}
      </div>

      <div className="flex flex-row justify-between">
        {isNew && (
          <Button
            variant="default"
            size="default"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </Button>
        )}

        {!isNew && (
          <>
            <Button
              type="submit"
              variant="default"
              size="default"
              onClick={handleSubmit}
            >
              Update
            </Button>
            <Button
              variant="alert"
              size="default"
              type="submit"
              onClick={handleDeleteEvent}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
