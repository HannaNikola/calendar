"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { CalendarEvent } from "@/app/types/typesApi";
import { addEventApi, fetchEventsApi } from "@/app/api/eventsApi";
import { ModalEvent } from "@/app/components_Calendar/ModalEvent";
import {ModalType} from "@/app/types/typesModal"


const localizer = momentLocalizer(moment);

export const CalendarEl = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [slot, setSlot] = useState({ start: new Date(), end: new Date() });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('new')

  const events = useSelector((state: RootState) => state.eventData.events) as CalendarEvent[];
  const { events: rawEvents, status } = useSelector((state: RootState) => state.eventData);

  

  useEffect(() => {
    dispatch(fetchEventsApi() as any);
  }, [dispatch]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setModalType('new')
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

  const handleSelectEvent = (event: CalendarEvent) => {
    setModalType('update')
    setSelectedEvent(event);
    setSlot({ start: new Date(event.start), end: new Date(event.end) });
    setModalOpen(true);
  };

  return (
    <section className="flex items-center justify-center p-4 ">
      <div className=" flex w-full h-[360px] md:h-[700px] ">
        <Calendar
          style={{ height: "100%", width: "100%" }}
          localizer={localizer}
          events={parsedEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "#3174ad",
              color: "white",
            },
          })}
        />

        <ModalEvent
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmitNewEvent}
          slotStart={slot.start}
          slotEnd={slot.end}
          selectedEvent = {selectedEvent}
          type={modalType}
        />
      </div>
    </section>
  );
};

export default CalendarEl;
