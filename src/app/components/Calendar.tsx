"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import eventsData from "../api/Event";
import { useState } from "react";
import { EventModal } from "./modal";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
}

const localizer = momentLocalizer(moment);

export const CalendarEl = () => {
  const [myEvents, setMyEvents] = useState(eventsData);
  const [slot, setSlot] = useState({ start: new Date(), end: new Date() });
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectSlot = ({ start, end }: any) => {
    setSlot({ start, end });
    setModalOpen(true);
  };
  console.log(myEvents);

  return (
    <div>
      <Calendar
        style={{ height: 800, width: 800 }}
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={(event) => ({
          title: `${moment(event.start).format("DD.MM.YYYY HH:mm")} - ${moment(event.end).format("HH:mm")}`,
          style: {
            backgroundColor: "#3174ad",
            color: "white",
          },
        })}
      />
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(newEvent) => {
          setMyEvents([...myEvents, { ...newEvent, id: myEvents.length + 1 }]);
        }}
        slotStart={slot.start}
        slotEnd={slot.end}
      />
    </div>
  );
};

export default CalendarEl;
