"use client";

import { Search } from "lucide-react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  clearFilter,
  setFilterEntity,
  setFilterFocus,
  setFilterQuery,
} from "../store/filters/filterReducer";
import { selectFilteredEvents } from "../store/filters/selector";
import { CalendarEvent } from "../types/typesApi";
import { openModal } from "../store/events/modalReducer";
import { useEffect} from "react";

export const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.filter.query);
  const filteredEvents = useSelector(selectFilteredEvents);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (document.activeElement?.tagName !== "INPUT") {
        dispatch(clearFilter());
        dispatch(setFilterFocus(false));
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dispatch]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setFilterQuery(value));
    dispatch(setFilterEntity("event"));
  };

  const handleClear = () => {
    dispatch(clearFilter());
    dispatch(setFilterFocus(false));
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    dispatch(
      openModal({
        type: "update",
        selectedEvent: event,
        slotStart: event.start,
        slotEnd: event.end,
        addTask: false,
      })
    );
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="relative w-full">
      <div
        className={`flex items-center gap-2 bg-input-light px-3 py-2 w-full ${
          query ? "rounded-t-3xl" : "rounded-3xl"
        }`}
      >
        <Search size={20} />
        <input
          type="text"
          value={query}
          onFocus={() => dispatch(setFilterFocus(true))}
          onBlur={(e) => {
            if (!e.target.value) dispatch(setFilterFocus(false));
          }}
          onChange={handleChangeValue}
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
        />
        <X onClick={handleClear} size={20} className="cursor-pointer" />
      </div>

      {query && (
        <ul className="absolute top-full left-0 w-full z-50 max-h-60 overflow-auto scrollbar-hide rounded-b-3xl bg-input-light shadow-lg text-sm">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <li
                key={event._id}
                onClick={() => handleSelectEvent(event)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {event.title}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400 italic">Nothing found...</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Filter;
