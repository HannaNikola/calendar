"use client";

import Header from "@/app/components_Calendar/Header";
import "./globals.css";
import { PageWrapper } from "@/app/shared/PageWrapper";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState} from "@/app/store/store";
import Navbar from "../components_Calendar/Navbar";
import Footer from "../components_Calendar/Footer";
import { closeElementModal } from "../store/sharedComponent/modalReducer";
import { ModalEvent } from "../components_Calendar/ModalEvent";
import { useEventHandlers } from "../hooks/useEventHandlers";



export const LayoutContent = ({ children, screenType }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { type, isOpen, data } = useSelector((state: RootState) => state.modal);
  const {
      handelAddEvent,
      handleDeleteEvent,
      selectedEvent,
      handelUpdateEvent,
    } = useEventHandlers();

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto pt-[60px] max-lg:pb-[60px]">
        <PageWrapper>
          {screenType === "desktop" && (
            <div className="max-lg:hidden">
              <Navbar />
            </div>
          )}

          {type === "event" && (
            <ModalEvent
              isOpen={isOpen}
              onClose={() => dispatch(closeElementModal())}
               slotStart={data?.slotStart ?? new Date()}
              slotEnd={data?.slotEnd ?? new Date(new Date().getTime() + 60 * 60 * 1000)}
              selectedEvent={selectedEvent}
              handelAddEvent={handelAddEvent}
              handelUpdateEvent={handelUpdateEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          )}

          {children}
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
};
