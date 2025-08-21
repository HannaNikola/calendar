import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CalendarEvent } from "../types/typesApi";
import { addEventApi, deleteEventApi, updateEventApi } from "../api/eventsApi";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { openModal, closeModal } from "@/app/store/events/modalEventReducer";
import { toDate } from "../utils/date";

export const useEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedEvent, isModalOpen, modalType, slotStart, slotEnd } =
    useSelector((state: RootState) => state.modalEvent);

  const handleSelectSlot = (arg: DateClickArg) => {
    const start = arg.date;
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    dispatch(
      openModal({
        type: "new",
        slotStart: start.toISOString(),
        slotEnd: end.toISOString(),
        addTask: false,
      })
    );
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    const event = arg.event;

    dispatch(
      openModal({
        type: "update",
        selectedEvent: {
          _id: event.id,
          title: event.title,
          start: event.start?.toISOString() ?? new Date().toISOString(),
          end: event.end?.toISOString() ?? new Date().toISOString(),
          allDay: event.allDay ?? false,
        },
        slotStart: event.start?.toISOString() ?? null,
        slotEnd: event.end?.toISOString() ?? null,
        addTask: false,
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
        dispatch(closeModal());
      });
  };

  const handelUpdateEvent = (eventData: CalendarEvent) => {
    const eventId = eventData._id;
    if (!eventId) return;

    return dispatch(updateEventApi({ id: eventId, eventData }))
      .unwrap()
      .finally(() => {
        dispatch(closeModal());
      });
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent?._id) return;

    dispatch(deleteEventApi(selectedEvent._id));
    dispatch(closeModal());
  };

  return {
    isModalOpen,
    modalType,
    selectedEvent: selectedEvent
      ? {
          ...selectedEvent,
          start: toDate(selectedEvent.start),
          end: toDate(selectedEvent.end),
        }
      : null,
    slotStart: toDate(slotStart),
    slotEnd: toDate(slotEnd),
    closeModal: () => dispatch(closeModal()),
    handleSelectEvent,
    handleSelectSlot,
    handelAddEvent,
    handelUpdateEvent,
    handleDeleteEvent,
  };
};
