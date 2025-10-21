"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import listPlugin from '@fullcalendar/list';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEventHandlers } from "../hooks/useEventHandlers";
import { EventDropArg } from "@fullcalendar/core/index.js";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { fetchEventsApi } from "../api/eventsApi";
import { useScreenType } from "../hooks/useScreenType";
import { useCalendarLayout } from "../hooks/useCalendarLayout";


type FullCalendarType = InstanceType<typeof FullCalendar>;




const CalendarEl = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, status } = useSelector((state: RootState) => state.eventData);

  const screenType = useScreenType();
  const { handleSelectEvent, handleSlotAction, handelUpdateEvent } =
    useEventHandlers();

  const [showLoader, setShowLoader] = useState(false);
  const calendarRef = useRef<FullCalendarType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { adjustCalendarLayout, isMobileWidth, calendarClasses } =
    useCalendarLayout(calendarRef, containerRef, screenType);
  const [slotData, setSlotData] = useState<{
    slotStart: Date | null;
    slotEnd: Date | null;
  }>({
    slotStart: null,
    slotEnd: null,
  });

  useEffect(() => {
    dispatch(fetchEventsApi());
  }, [dispatch]);

  useEffect(() => {
    if (status === "loading") {
      const timeout = setTimeout(() => setShowLoader(true), 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowLoader(false);
    }
  }, [status]);

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
    if (screenType === "desktop") {
      tippy(el, {
        content: `<strong>${event.title}</strong><br/>${time}`,
        allowHTML: true,
        placement: "top",
        theme: "gray",
        animation: "fade",
      });
    }
  };

  const handleEventDrop = (info: EventDropArg) => {
    const updatedEvent = {
      _id: info.event.id,
      title: info.event.title,
      start: info.event.start!,
      end: info.event.end!,
      allDay: info.event.allDay,
      isCompletedTask: (info.event as any).isCompletedTask
      
    }

    handelUpdateEvent(updatedEvent);
  };

  return (
    <section className="flex flex-col w-full h-full ">
      {showLoader ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full border-t-transparent animate-spin" />
        </div>
      ) : (
        <div
          ref={containerRef}
          className={`
            sm:px-4 flex-1
            
            ${calendarClasses}
          `}
        >
          <FullCalendar
            ref={calendarRef}
            plugins={[
              timeGridPlugin,
              dayGridPlugin,
              multiMonthPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridDay, timeGridWeek, dayGridMonth, listPlugin ,multiMonthYear",
            }}
            views={{
              timeGridDay: {
                buttonText: "Day",
              },
              timeGridWeek: {
                buttonText: "Week",
              },
              dayGridMonth: {
                buttonText: "Month",
                dayMaxEventRows: isMobileWidth ? 6 : 3,
                fixedWeekCount: false,
              },
               listPlugin :{
                type:'listWeek',
                buttonText: "list"
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
            select={(arg) => handleSlotAction(arg, setSlotData)}
            dateClick={(arg) => handleSlotAction(arg, setSlotData)}
            eventClick={handleSelectEvent}
            eventMouseEnter={handleMouseEnter}
            eventDrop={handleEventDrop}
            stickyHeaderDates="auto"
            height="100%"
            contentHeight="auto"
            expandRows={true}
            eventClassNames="bg-event hover:bg-hover-event text-white"
            datesSet={adjustCalendarLayout}
            viewDidMount={adjustCalendarLayout}
            windowResize={adjustCalendarLayout}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: "08:00",
              endTime: "18:00",
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
          />
        </div>
      )}
    </section>
  );
};

export default CalendarEl;
