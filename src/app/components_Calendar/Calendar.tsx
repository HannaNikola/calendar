"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { CalendarEvent } from "@/app/types/typesApi";
import {
  addEventApi,
  deleteEventApi,
  fetchEventsApi,
  updateEventApi,
} from "@/app/api/eventsApi";
import { ModalEvent } from "./ModalEvent";
import { ModalType } from "@/app/types/typesModal";
import { EventClickArg, EventDropArg } from "@fullcalendar/core/index.js";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export const CalendarEl = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [slot, setSlot] = useState({ start: new Date(), end: new Date() });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("new");

  const { events } = useSelector((state: RootState) => state.eventData);

  useEffect(() => {
    dispatch(fetchEventsApi());
  }, [dispatch]);

  const handleSelectSlot = (arg: DateClickArg) => {
    const start = arg.date;
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    setModalType("new");
    setSelectedEvent(null);
    setSlot({ start, end });
    setModalOpen(true);
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    const event = arg.event;

    const calendarEvent: CalendarEvent = {
      _id: event.id,
      title: event.title,
      start: event.start ?? new Date(),
      end: event.end ?? new Date(),
      allDay: event.allDay,
    };

    setModalType("update");
    setSelectedEvent(calendarEvent);
    setSlot({
      start: new Date(calendarEvent.start || new Date()),
      end: new Date(calendarEvent.end || new Date()),
    });
    setModalOpen(true);
  };

  const handelAddEvent = (eventData: CalendarEvent) => {
    if (!eventData.start || !eventData.end) {
      return;
    }
    const formattedEvent = {
      ...eventData,
      start: new Date(eventData.start),
      end: new Date(eventData.end),
      allDay: eventData.allDay ?? false,
      addTask: eventData.addTask ?? false,
    };
    dispatch(addEventApi(formattedEvent));
    setModalOpen(false);
  };

  const handelUpdateEvent = (eventData: CalendarEvent) => {
    const eventId = eventData._id;
    if (!eventId) return;

    dispatch(updateEventApi({ id: eventId, eventData }));
    setModalOpen(false);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent?._id) return;

    dispatch(deleteEventApi(selectedEvent._id));
    setModalOpen(false);
  };

  const parsedEvents = events.map((event) => ({
    ...event,
    id: event._id,
    start: event.start ? new Date(event.start) : new Date(),
    end: event.end ? new Date(event.end) : new Date(),
  }));

  const handleMouseEnter = ({ el, event }: any) => {
    const time = event.start?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    tippy(el, {
      content: `
      <strong>${event.title}</strong><br/>
      ${time}
    `,
      allowHTML: true,
      placement: "top",
      theme: "gray",
      animation: "fade",
    });
  };

  const handelEventDrop = (info: EventDropArg) => {
    const updatedEvent: CalendarEvent = {
      _id: info.event.id,
      title: info.event.title,
      start: info.event.start!,
      end: info.event.end!,
      allDay: info.event.allDay,
    };
    handelUpdateEvent(updatedEvent);
  };

  return (
    <section className="flex items-center justify-center p-4 ">
      <div className=" flex w-full m-0">
        <FullCalendar
          eventMouseEnter={handleMouseEnter}
          eventDrop={handelEventDrop}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            multiMonthPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right:
              "dayGridMonth,timeGridWeek,timeGridDay,listYear,multiMonthYear",
          }}
          views={{
            dayGridMonth: { buttonText: "Month" },
            timeGridWeek: { buttonText: "Week" },
            timeGridDay: { buttonText: "Day" },

            listYear: {
              type: "list",
              duration: { years: 1 },
              buttonText: "Year List",
            },
            multiMonthYear: {
              type: "multiMonth",
              duration: { months: 12 },
              buttonText: "Year",
              multiMonthMinWidth: 200,
            },
          }}
          events={parsedEvents}
          editable={true}
          selectable={true}
          dateClick={handleSelectSlot}
          eventClick={handleSelectEvent}
          height="auto"
          eventClassNames={() => "bg-sky-700 text-white "}
          contentHeight="auto"
          // aspectRatio={1.5}

          businessHours={[
            {
              daysOfWeek: [1, 2, 3],
              startTime: "08:00",
              endTime: "18:00",
            },
            {
              daysOfWeek: [4, 5],
              startTime: "10:00",
              endTime: "16:00",
            },
          ]}
        />

        <ModalEvent
          type={modalType}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          slotStart={slot.start}
          slotEnd={slot.end}
          selectedEvent={selectedEvent}
          handelAddEvent={handelAddEvent}
          handelUpdateEvent={handelUpdateEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </section>
  );
};

export default CalendarEl;
