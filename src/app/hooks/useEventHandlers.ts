import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CalendarEvent } from "../types/typesApi";
import { addEventApi, deleteEventApi, updateEventApi } from "../api/eventsApi";
import { closeModal } from "../store/redux/modalReducer";

export const useEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedEvent, isModalOpen, modalType, slotStart, slotEnd } =
    useSelector((state: RootState) => state.modal);

  const handelAddEvent = (eventData: CalendarEvent) => {
    if (!eventData.start || !eventData.end) return;

    const payload = {
      title: eventData.title,
      start: new Date(eventData.start),
      end: new Date(eventData.end),
      allDay: eventData.allDay ?? false,
      addTask: eventData.addTask ?? false,
    };

    dispatch(addEventApi(payload));
    dispatch(closeModal());
  };

  const handelUpdateEvent = (eventData: CalendarEvent) => {
    const eventId = eventData._id;
    if (!eventId) return;

    dispatch(updateEventApi({ id: eventId, eventData }));
    dispatch(closeModal());
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent?._id) return;

    dispatch(deleteEventApi(selectedEvent._id));
    dispatch(closeModal());
  };

  return {
    isModalOpen,
    modalType,
    selectedEvent,
    slotStart,
    slotEnd,
    closeModal: () => dispatch(closeModal()),
    handelAddEvent,
    handelUpdateEvent,
    handleDeleteEvent,
  };
};
