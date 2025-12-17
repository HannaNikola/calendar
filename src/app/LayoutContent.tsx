"use client";

import Header from "@/app/components_Calendar/Header";
import "./globals.css";
import { PageWrapper } from "@/app/shared/ui/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useState } from "react";
import { useEventHandlers } from "./hooks/useEventHandlers";
import SmallCalendar from "./components_Calendar/SmallCalendar";
import { ModalEvent } from "./components_Calendar/ModalEvent";
import { closeElementModal } from "./store/sharedComponent/modalReducer";
import SettingsSidebar from "./components_SettingsSidebar/SettingsSidebar";
import Footer from "./components_Calendar/Footer";


export const LayoutContent = ({ children, screenType }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { type, isOpen, data } = useSelector((state: RootState) => state.modal);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    handelAddEvent,
    handleDeleteEvent,
    selectedEvent,
    handelUpdateEvent,
  } = useEventHandlers();

  return (
    <>
      <Header onSettingsClick={() => setSidebarOpen(true)} />
      <main className="flex-1 overflow-y-auto pt-[60px] max-lg:pb-[60px]">
        <PageWrapper>
          {screenType === "desktop" && (
            <div className="max-lg:hidden">
              <SmallCalendar type={screenType} />
            </div>
          )}
          {type === "event" && (
            <ModalEvent
              isOpen={isOpen}
              onClose={() => dispatch(closeElementModal())}
              slotStart={data?.slotStart ?? new Date()}
              slotEnd={
                data?.slotEnd ?? new Date(new Date().getTime() + 60 * 60 * 1000)
              }
              selectedEvent={selectedEvent}
              handelAddEvent={handelAddEvent}
              handelUpdateEvent={handelUpdateEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          )}

          {children}
        </PageWrapper>
      </main>
      <Footer type={screenType} onSettingsClick={() => setSidebarOpen(true)} />
      <SettingsSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};
