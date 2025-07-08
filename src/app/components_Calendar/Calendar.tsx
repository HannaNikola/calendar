"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { CalendarEvent } from "@/app/types/typesApi";
import { openModal, closeModal } from "@/app/store/redux/modalReducer";
import {
  addEventApi,
  deleteEventApi,
  fetchEventsApi,
  updateEventApi,
} from "@/app/api/eventsApi";
import { ModalEvent } from "./ModalEvent";
import { EventClickArg, EventDropArg } from "@fullcalendar/core/index.js";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export const CalendarEl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.eventData);

  const { isModalOpen, modalType, selectedEvent, slotStart, slotEnd } =
    useSelector((state: RootState) => state.modal);

  useEffect(() => {
    dispatch(fetchEventsApi());
  }, [dispatch]);

  const handleSelectSlot = (arg: DateClickArg) => {
    const start = arg.date;
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    dispatch(
      openModal({
        type: "new",
        // slotStart: start.toISOString(),
        // slotEnd: end.toISOString(),
        slotStart: start, 
      slotEnd: end,
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
        start: event.start ?? new Date(),
        end: event.end ?? new Date(),
        allDay: event.allDay ?? false,
      },
      slotStart: event.start ?? null,
      slotEnd: event.end ?? null,
    })
  );
  };

  // const handelAddEvent = (eventData: CalendarEvent) => {
  //   if (!eventData.start || !eventData.end) {
  //     return;
  //   }
  //   dispatch(addEventApi(eventData));
  //   dispatch(closeModal());
  // };


  const handelAddEvent = (eventData: CalendarEvent) => {
  if (!eventData.start || !eventData.end) return;

  const payload = {
    title: eventData.title,
    start: new Date(eventData.start), // приведение к Date
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

  // const parsedEvents = events.map((event) => ({
  //   ...event,
  //   id: event._id,
  //   start: new Date(event.start),
  //   end: new Date(event.end),
  //   allDay: event.allDay ?? false,
  // }));
  const parsedEvents = events.map((event) => ({
  ...event,
  id: event._id,
  start: event.start ? new Date(event.start) : new Date(), 
  end: event.end ? new Date(event.end) : new Date(),
  allDay: event.allDay ?? false,
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
    <section className="flex items-center justify-center">
      <div className=" flex w-full m-0 border border-gray-light-border bg-white p-5 rounded-tl-[50px] ">
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
            timeGridDay: { buttonText: "Day", typy: "block" },

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
          eventClassNames={() => "bg-sky-700 text-white w-full"}
          contentHeight="auto"
          aspectRatio={1.2}
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
          isOpen={isModalOpen}
          onClose={() => dispatch(closeModal())}
          slotStart={slotStart}
          slotEnd={slotEnd}
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
