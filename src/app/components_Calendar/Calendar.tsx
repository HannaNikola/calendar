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
import { useEventHandlers } from "../hooks/useEventHandlers";
import { ModalEvent } from "./ModalEvent";
import { EventClickArg, EventDropArg } from "@fullcalendar/core/index.js";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { fetchEventsApi } from "../api/eventsApi";

export const CalendarEl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, status } = useSelector((state: RootState) => state.eventData);
  const {
    isModalOpen,
    modalType,
    slotStart,
    slotEnd,
    closeModal,
    handelAddEvent,
    handleDeleteEvent,
    selectedEvent,
    handelUpdateEvent,
  } = useEventHandlers();

  useEffect(() => {
    dispatch(fetchEventsApi());
  }, [dispatch]);

  const handleSelectSlot = (arg: DateClickArg) => {
    const start = arg.date;
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    dispatch(
      openModal({
        type: "new",
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
    <section className="flex w-full h-full items-center justify-center ">
      {status === "loading" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className=" bg-wite flex w-full h-full  m-0 border border-gray-light-border  p-5 rounded-tl-[50px] ">
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
            //  height="100%"
            height="auto"
            contentHeight="100%"
            expandRows={true}
            eventClassNames={() => "bg-sky-700 text-white w-full h-full"}
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
      )}
    </section>
  );
};

export default CalendarEl;
