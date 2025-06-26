import * as Yup from "yup";
import { EventModalProps } from "@/app/types/typesModal";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarEvent } from "../types/typesApi";
import "flatpickr/dist/themes/airbnb.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../components_Calendar/calendar.css";

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
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [endDay, setEndDay] = useState<Date | null>(null);
  const isNew = type === "new";

  useEffect(() => {
    setTitle(type === "new" ? "" : selectedEvent?.title || "");
    if (selectedEvent) {
      const start = new Date(selectedEvent.start || "");
      const end = new Date(selectedEvent.end || "");
      setStartDay(start);
      setEndDay(end);
      setStartTime(new Date(1970, 0, 1, start.getHours(), start.getMinutes()));
      setEndTime(new Date(1970, 0, 1, end.getHours(), end.getMinutes()));
    } else if (slotStart && slotEnd) {
      const start = new Date(slotStart);
      const end = new Date(slotEnd);
      setStartDay(start);
      setEndDay(end);
      setStartTime(new Date(1970, 0, 1, start.getHours(), start.getMinutes()));
      setEndTime(new Date(1970, 0, 1, end.getHours(), end.getMinutes()));
    }
  }, [selectedEvent, slotStart, slotEnd]);

  const combineDateTime = (
    date: Date | null,
    time: Date | null
  ): Date | null => {
    if (!date || !time) return null;
    const combined = new Date(date);
    combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return combined;
  };

  const handleSubmit = () => {
    const start = combineDateTime(startDay, startTime);
    const end = combineDateTime(endDay, endTime);

    if (!start || !end) {
      return;
    }

    const eventData: CalendarEvent = {
      ...selectedEvent,
      title,
      start,
      end,
      allDay: false,
    };

    console.log(eventData);
    isNew ? handelAddEvent(eventData) : handelUpdateEvent(eventData);
  };

  const handelOverlowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handelOverlowClick}
      className=" flex fixed inset-0  bg-black/50  items-center justify-center z-50 shadow-2xs p-4"
    >
      <div className=" p-4 rounded-lg shadow-lg min-w-[300px] bg-white mx-auto">
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
            className="border-none rounded bg-sky-100 focus:outline-none focus:bg-sky-200 p-2 mb-4 text-black placeholder:text-gray resize-none overflow-hidden min-h-[40px]"
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />

          <div className="mb-4">
            <div className="flex flex-1 mb-2 gap-2">
            <DatePicker
              selected={startDay}
              onChange={(date) => setStartDay(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select the day"
              className=" w-[150px] rounded bg-sky-100 focus:outline-none focus:bg-sky-200 p-2 text-black "
            />
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Время"
              placeholderText="Select the time"
              className="rounded w-[150px] bg-sky-100 focus:outline-none focus:bg-sky-200 p-2 text-black"
            />
          </div>
          <div className="flex flex-1 mb-2 gap-2">
           <DatePicker
              selected={endDay}
              onChange={(date) => setEndDay(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select the day"
              className=" w-[150px] rounded bg-sky-100 focus:outline-none focus:bg-sky-200 p-2 text-black"
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
              className=" w-[150px] rounded bg-sky-100 focus:outline-none focus:bg-sky-200 p-2 text-black"
            />
            </div>
          </div>
          <div className="flex justify-between mb-8 ">
            <div className="flex items-center">
              <label className="flex text-black mr-2">All day event</label>
              <input type="checkbox" name="allDay" />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Add Task</label>
              <input type="checkbox" name="addTask" />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          {isNew && (
            <button
              onClick={handleSubmit}
              className="w-[50px] text-sky-950 hover:text-sky-300"
              type="submit"
            >
              Save
            </button>
          )}

          {!isNew && (
            <>
              <button
                onClick={handleSubmit}
                className="w-[50px] text-sky-950 hover:text-sky-300"
                type="submit"
              >
                Update
              </button>
              <button
                onClick={handleDeleteEvent}
                type="button"
                className="w-[50px] text-red-700 hover:text-red-300"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
