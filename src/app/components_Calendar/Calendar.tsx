"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addEventApi, fetchEventsApi, CalendarEvent } from "../store/slices/eventReducer";
import { EventModal } from "./modal";

const localizer = momentLocalizer(moment);

export const CalendarEl = () => {
  const dispatch = useDispatch<AppDispatch>();

 
  const events = useSelector((state: RootState) => state.eventData.events) as CalendarEvent[];
  const { events: rawEvents, status } = useSelector((state: RootState) => state.eventData);

  const [slot, setSlot] = useState({ start: new Date(), end: new Date() });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEventsApi() as any);
  }, [dispatch]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSlot({ start, end });
    setModalOpen(true);
  };

  const handleSubmitNewEvent = (newEvent: CalendarEvent) => {
    dispatch(addEventApi(newEvent));
  };

 
  const parsedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div className="w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] 2xl:w-[1150px]">
      <Calendar
        localizer={localizer}
        events={parsedEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#3174ad",
            color: "white",
          },
        })}
      />

      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitNewEvent}
        slotStart={slot.start}
        slotEnd={slot.end}
      />
    </div>
  );
};

export default CalendarEl;