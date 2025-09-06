import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CalendarEvent } from "../types/typesApi";
import { addEventApi, deleteEventApi, updateEventApi } from "../api/eventsApi";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { toDate } from "../utils/date";
import {
  closeElementModal,
  openElementModal,
} from "../store/sharedComponent/modalReducer";
import { DateClickArg } from "@fullcalendar/interaction/index.js";



export const useEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.eventData);

  const { selectedId, type, mode, isOpen } = useSelector(
    (state: RootState) => state.modal
  );
  const selectedEvent = useSelector((state: RootState) =>
    state.eventData.events.find((item) => item._id === selectedId)
  );

  const handleSlotAction = (
    arg: DateSelectArg | DateClickArg,
    setSlotData: React.Dispatch<
      React.SetStateAction<{ slotStart: Date | null; slotEnd: Date | null }>
    >
  ) => {
    let start: Date;
    let end: Date;

    if ("start" in arg) {
     
      start = arg.start;
      end = arg.end ?? new Date(arg.start.getTime() + 60 * 60 * 1000);
    } else {
     
      start = arg.date;
      end = new Date(arg.date.getTime() + 60 * 60 * 1000);
    }

    setSlotData({
      slotStart: start,
      slotEnd: end,
    });

    dispatch(
      openElementModal({
        mode: "new",
        type: "event",
        selectedId: undefined,
      })
    );
  };


  const handleSelectEvent = (arg: EventClickArg) => {
    dispatch(
      openElementModal({
        mode: "update",
        type: "event",
        selectedId: arg.event.id,
      })
    );
  };

  const handelAddEvent = (eventData: CalendarEvent) => {
    if (!eventData.start || !eventData.end) return;

    const payload = {
      title: eventData.title,
      start: new Date(eventData.start),
      end: new Date(eventData.end),
      allDay: eventData.allDay ?? false,
      addTask: eventData.addTask ?? false,
    };

    return dispatch(addEventApi(payload))
      .unwrap()
      .finally(() => {
        dispatch(closeElementModal());
      });
  };

  const handelUpdateEvent = (eventData: CalendarEvent) => {
    const eventId = eventData._id;
    if (!eventId) return;

    const payload = {
      title: eventData.title,
      start: new Date(eventData.start!),
      end: new Date(eventData.end!),
      allDay: eventData.allDay,
      addTask: eventData.addTask,
    };
    return dispatch(updateEventApi({ id: eventId, eventData: payload }))
      .unwrap()
      .finally(() => {
        dispatch(closeElementModal());
      });
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent?._id) return;

    dispatch(deleteEventApi(selectedEvent._id));
    dispatch(closeElementModal());
  };

  return {
    isOpen,
    mode,
    selectedEvent: selectedEvent
      ? {
          ...selectedEvent,
          start: toDate(selectedEvent.start),
          end: toDate(selectedEvent.end),
        }
      : null,
    closeModal: () => dispatch(closeElementModal()),
    handleSelectEvent,
    handleSlotAction,
    handelAddEvent,
    handelUpdateEvent,
    handleDeleteEvent,
  };
};
