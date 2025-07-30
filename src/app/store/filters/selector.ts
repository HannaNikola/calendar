import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CalendarEvent } from "@/app/types/typesApi";
import Fuse from "fuse.js";


export const selectFilterQuery = (state:RootState)=> state.filter.query;
export const selectFilterEntity = (state:RootState)=> state.filter.entity;
export const selectAllEvents = (state:RootState)=> state.eventData.events;



export const selectFilteredEvents = createSelector(
  [selectFilterQuery, selectFilterEntity, selectAllEvents],
  (query, entity, events) => {
    if (entity !== "event" || !query) return events;

    const fuse = new Fuse(events, {
      keys: ["title"], 
      threshold: 0.4, 
    });

    const results = fuse.search(query);
    return results.map(result => result.item);
  }
);
