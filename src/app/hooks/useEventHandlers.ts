
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CalendarEvent } from "../types/typesApi";
import { addEventApi, deleteEventApi, updateEventApi } from "../api/eventsApi";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { toDate } from "../utils/date";
import { closeElementModal, openElementModal } from "../store/sharedComponent/modalReducer";



export const useEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const{events} = useSelector((state:RootState)=>state.eventData)

  const{selectedId, type, mode, isOpen}=useSelector((state:RootState)=>state.modal)
  const selectedEvent= useSelector((state:RootState)=> state.eventData.events.find(item => item._id === selectedId))

//   const handleSelectSlot = (arg: DateSelectArg) => {
//   dispatch(
//     openElementModal({
//       mode: "new",
//       type: 'event',
//       selectedId: undefined
//     })
//   );

// };


const handleSelectSlot = (arg: DateSelectArg) => {
  dispatch(
    openElementModal({
      mode: "new",
      type: 'event',
      selectedId: undefined
    })
  );
  return {
    start: arg.start,
    end: arg.end
  };
};


  const handleSelectEvent = (arg: EventClickArg) => {

    dispatch(
      openElementModal({
        mode: "update",
        type:'event',
        selectedId: arg.event.id
        
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
      addTask: eventData.addTask
    };
    return dispatch(updateEventApi({ id: eventId, eventData:payload }))
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
    handleSelectSlot,
    handelAddEvent,
    handelUpdateEvent,
    handleDeleteEvent,
  };
};