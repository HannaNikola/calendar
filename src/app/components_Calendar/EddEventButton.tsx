"use client";
import { Plus } from "lucide-react";
import { Button } from "../shared/ui/Button";
import { ModalEvent } from "./ModalEvent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEventHandlers } from "../hooks/useEventHandlers";
import { useScreenType } from "../hooks/useScreenType";
import { EventModalProps } from "../types/typesModalEvent";
import {
  closeElementModal,
  openElementModal,
} from "../store/sharedComponent/modalReducer";

const AddEventButton = ({ onClose }: EventModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const screenType = useScreenType();
  const { type, mode, isOpen } = useSelector((state: RootState) => state.modal);

  const { handelAddEvent } = useEventHandlers();

  const handleAddClick = () => {
    // const now = new Date();
    // const end = new Date(now.getTime() + 60 * 60 * 1000);
    dispatch(
      openElementModal({
        mode: "new",
        type: "event",
      })
    );
  };

  const variant = screenType === "desktop" ? "rounded" : "transper";
  const size = screenType === "desktop" ? "large" : "small";

  return (
    <div>
      <Button onClick={handleAddClick} variant={variant} size={size}>
        <Plus size={20} className="mr-1 text-main" />
        Add
      </Button>

      {type === "event" && (
        <ModalEvent
          isOpen={isOpen}
          onClose={() => dispatch(closeElementModal())}
          handelAddEvent={handelAddEvent}
        />
      )}
    </div>
  );
};

export default AddEventButton;
