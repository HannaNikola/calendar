"use client";
import { Plus } from "lucide-react";
import { Button } from "../shared/ui/Button";
import { ModalEvent } from "./ModalEvent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { openModal } from "../store/events/modalReducer";
import { useEventHandlers } from "../hooks/useEventHandlers";
import { useScreenType } from "../hooks/useScreenType";
import { toISOString } from "../utils/date";

const AddEventButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const screenType = useScreenType();

  const {
    isModalOpen,
    modalType,
    closeModal,
    handelAddEvent,
  } = useEventHandlers();

  const handleAddClick = () => {
    const now = new Date();
    const end = new Date(now.getTime() + 60 * 60 * 1000);
    dispatch(
      openModal({
        type: "new",
        slotStart: toISOString(now),
    slotEnd: toISOString(end),
        selectedEvent: null,
        addTask: false,
      })
    );
  };

  const variant = screenType === "desktop" ? "rounded" : "transper";
  const size = screenType === "desktop" ? "large" : "small";

  return (
    <div>
      <Button onClick={handleAddClick} variant={variant} size={size}>
        <Plus size={20} className="mr-1" />
        Add
      </Button>

      <ModalEvent
        type={modalType}
        isOpen={isModalOpen}
        onClose={() => dispatch(closeModal())}
        handelAddEvent={handelAddEvent}
      />
    </div>
  );
};

export default AddEventButton;
