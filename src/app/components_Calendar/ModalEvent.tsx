import * as Yup from "yup";
import { EventModalProps } from "@/app/types/typesModalEvent";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarEvent } from "../types/typesApi";
import "flatpickr/dist/themes/airbnb.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components_Calendar/calendar.css";
import { Button } from "@/app/shared/ui/Button";
import { toast, ToastContainer } from "react-toastify";
import { useEventHandlers } from "../hooks/useEventHandlers";
import { toDate } from "../utils/date";
import { useDispatch } from "react-redux";
import { addTodoApi } from "../api/todoApi";
import { AppDispatch } from "../store/store";

const EventSchema = Yup.object().shape({
  title: Yup.string()
    .max(70, "Title must be less than 100 characters")
    .required("title can`t be empty"),
});

export const ModalEvent = ({
  type = "new",
  isOpen,
  onClose,
}: EventModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [endDay, setEndDay] = useState<Date | null>(null);
  const [allDay, setAllDay] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const isNew = type === "new";
  const {
    slotStart,
    slotEnd,
    handelAddEvent,
    handleDeleteEvent,
    selectedEvent,
    handelUpdateEvent,
  } = useEventHandlers();

  useEffect(() => {
    const now = new Date();
    const start = toDate(selectedEvent?.start ?? slotStart ?? now);
    const end = toDate(selectedEvent?.end ?? slotEnd ?? now);

    if (!start) return;
    setTitle(selectedEvent?.title ?? "");
    setAllDay(selectedEvent?.allDay ?? false);

    setStartDay(start);
    setStartTime(new Date(1970, 0, 1, start.getHours(), start.getMinutes()));

    if (isNew) {
      setEndDay(start);
      const oneHourLater = new Date(
        1970,
        0,
        1,
        start.getHours() + 1,
        start.getMinutes()
      );
      setEndTime(oneHourLater);
    } else if (end) {
      setEndDay(end);
      setEndTime(new Date(1970, 0, 1, end.getHours(), end.getMinutes()));
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

  const handleEndDayChange = (date: Date | null) => {
    setEndDay(date);
    if (date && startTime) {
      setEndTime(
        new Date(1970, 0, 1, startTime.getHours() + 1, startTime.getMinutes())
      );
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
            description: "",
            isImportant: false,
            isCompleted: false,
            end: createdEvent.end,
            allDay: createdEvent.allDay,
            eventId: createdEvent._id,
            repeat: "none",
            reminder: {
              triggerBefore: "none",
              notifyAt: null,
              notified: false,
            },
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

  const handelAddTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTask(e.target.checked);
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
            <h1 className="flex-1 text-center  text-h2 mb-6">Create event</h1>
          ) : (
            <h1 className="flex-1 text-center  text-main mb-6">Update event</h1>
          )}

          <button className="flex" onClick={onClose}>
            {" "}
            <X size={15} />
          </button>
        </div>

        <div className="flex flex-col ">
          <ToastContainer />
          <textarea
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-none rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 mb-4 text-main placeholder:text-gray resize-none overflow-hidden min-h-[40px] shadow-lg"
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />

          <div className="mb-4">
            <div className="flex flex-1  mb-2 gap-2">
              <DatePicker
                selected={startDay}
                onChange={handleStartDayChange}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select the day"
                className=" w-[150px] rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
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
                className="rounded w-[150px] bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
              />
            </div>
            <div className="flex flex-1 mb-2 gap-2">
              <DatePicker
                selected={endDay}
                onChange={handleEndDayChange}
                dateFormat="dd-MM-yyyy"
                placeholderText="Select the day"
                className=" w-[150px] rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
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
                className=" w-[150px] rounded bg-input-light focus:outline-none focus:bg-hover-input p-2 text-main shadow-lg"
              />
            </div>
          </div>
          <div className="flex justify-between mb-8 ">
            <div className="flex items-center">
              <label className="flex text-main mr-2">All day event</label>
              <input
                type="checkbox"
                name="allDay"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
            </div>
            <div className="flex items-center">
              <label className="mr-2 text-main">Add Task</label>
              <input type="checkbox" name="addTask" onChange={handelAddTodo} />
            </div>
          </div>
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
      </div>
    </div>
  );
};


