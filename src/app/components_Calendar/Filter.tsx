"use client";

import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import {
  setFilterEntity,
  setFilterQuery,
  setFilterFocus,
  setSelectedItem,
  clearFilter,
} from "../store/filters/filterReducer";
import { selectFilterResult } from "../store/filters/selector";
import { RootState, AppDispatch } from "../store/store";
import { openElementModal } from "../store/sharedComponent/modalReducer";

export const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const query = useSelector((s: RootState) => s.filter.query);
  const entity = useSelector((s: RootState) => s.filter.entity);
  const isFocused = useSelector((s: RootState) => s.filter.isFocused);
  const selectedItem = useSelector((s: RootState) => s.filter.selectedItem);
  const result = useSelector(selectFilterResult);
  const modalIsOpen = useSelector((s: RootState) => s.modal?.isOpen);
 const { data } = useSelector(
    (state: RootState) => state.modal
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pathname) return;
    const path = pathname.split("?")[0].toLowerCase();

    if (path.startsWith("/calendar")) {
      dispatch(setFilterEntity("event"));
    } else if (path.startsWith("/task/favorit")) {
      dispatch(setFilterEntity("favorite"));
    } else if (path.startsWith("/task/completed")) {
      dispatch(setFilterEntity("completed"));
    } else if (path.startsWith("/task") || path.startsWith("/tasks")) {
      dispatch(setFilterEntity("todo"));
    } else {
      dispatch(setFilterEntity(null));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        dispatch(setFilterFocus(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  useEffect(() => {
    if (modalIsOpen) {
      dispatch(setFilterFocus(false));
    }
  }, [modalIsOpen, dispatch]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterQuery(e.target.value));
  };

  const handleSelectItem = (item: any) => {
    if (!item?._id) return;

    if (entity === "event") {
      dispatch(setFilterFocus(false));
      dispatch(
        openElementModal({
          mode: "update",
          type: "event",
          data:{selectedId: item._id}
        })
      );

      dispatch(clearFilter());
    } else if (entity === "todo") {
      dispatch(setSelectedItem({ _id: item._id, title: item.title }));
    }
  };

  const handleClear = () => {
    dispatch(clearFilter());
    dispatch(setFilterFocus(false));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`flex items-center gap-2 bg-input-light px-3 py-2 w-full ${
          entity === "event" && query ? "rounded-t-3xl" : "rounded-3xl"
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

      {isFocused && query && entity === "event" && (
        <ul className="absolute top-full left-0 w-full  z-50 max-h-60 overflow-hidden scrollbar-hide rounded-b-3xl bg-input-light shadow-lg text-sm">
          {result.length > 0 ? (
            result.map((item) => (
              <li
                key={item._id}
                onClick={() => handleSelectItem(item)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.title}
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






