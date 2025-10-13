import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CalendarEvent } from "../types/typesApi";
import { addEventApi, deleteEventApi, updateEventApi } from "../api/eventsApi";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { toDate, toISOString } from "../utils/date";
import {
  closeElementModal,
  openElementModal,
} from "../store/sharedComponent/modalReducer";
import { DateClickArg } from "@fullcalendar/interaction/index.js";


export const useEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data,  mode, isOpen } = useSelector(
    (state: RootState) => state.modal
  );
  const selectedEvent = useSelector((state: RootState) =>data?.selectedId 
   ? state.eventData.events.find((item) => item._id === data.selectedId)
   : undefined
)

  const handleSlotAction = (
    arg: DateSelectArg | DateClickArg,
    setSlotData: React.Dispatch< React.SetStateAction<{ slotStart: Date | null; slotEnd: Date | null }>>
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

    dispatch(
      openElementModal({
        mode: "new",
        type: "event",
        data: {
          slotStart: toISOString(start),
          slotEnd: toISOString(end),
          selectedId: null,
        },
      })
    );
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    dispatch(
      openElementModal({
        mode: "update",
        type: "event",
        data:{selectedId: arg.event.id },
      })
    );
  };

  const handelAddEvent = (eventData: CalendarEvent) => {
    if (!eventData.start || !eventData.end) return;

    return dispatch(
      addEventApi({
        title: eventData.title,
        description: eventData.description,
        start: new Date(eventData.start),
        end: new Date(eventData.end),
        allDay: eventData.allDay ?? false,
        addTask: eventData.addTask ?? false,
      })
    )
      .unwrap()
      .finally(() => dispatch(closeElementModal()));
  };

  const handelUpdateEvent = (eventData: CalendarEvent) => {
    if (!eventData._id) return;

    return dispatch(
      updateEventApi({
        id: eventData._id,
        eventData: {
          title: eventData.title,
          start: toDate(eventData.start),
          end: toDate(eventData.end),
          allDay: eventData.allDay,
          addTask: eventData.addTask,
        },
      })
    )
      .unwrap()
      .finally(() => dispatch(closeElementModal()));
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
