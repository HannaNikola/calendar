import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Fuse from "fuse.js";

export const selectFilterQuery = (state: RootState) => state.filter.query;
export const selectFilterEntity = (state: RootState) => state.filter.entity;
export const selectAllEvents = (state: RootState) => state.eventData.events;
export const selectAllTodo = (state: RootState) => state.todo.todos;

export const selectFilteredEvents = createSelector(
  [selectFilterQuery, selectFilterEntity, selectAllEvents],
  (query, entity, events) => {
    if (entity !== "event" || !query) return events;

    const fuse = new Fuse(events, {
      keys: ["title"],
      threshold: 0.4,
    });

    const results = fuse.search(query);
    return results.map((result) => result.item);
  }
);

export const selectFilteredTodos = createSelector(
  [selectFilterQuery, selectFilterEntity, selectAllTodo],
  (query, entity, todos) => {
    if (entity !== "todo" || !query) return todos;

    const fuse = new Fuse(todos, { keys: ["title"], threshold: 0.4 });
    const results = fuse.search(query);
    return results.map((result) => result.item);
  }
);

export const selectFilterResult = createSelector(
  [selectFilterEntity, selectFilteredEvents, selectFilteredTodos],
  (entity, filteredEvents, filteredTodos) => {
    if (entity === "event") return filteredEvents;
    if (entity === "todo") return filteredTodos;
    return [];
  }
);
