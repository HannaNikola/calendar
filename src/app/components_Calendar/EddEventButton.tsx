"use client";
import { Plus } from "lucide-react";
import { Button } from "../shared/ui/Button";
import { useDispatch} from "react-redux";
import { AppDispatch} from "../store/store";
import { useScreenType } from "../hooks/useScreenType";
import {  openElementModal,} from "../store/sharedComponent/modalReducer";

const AddEventButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const screenType = useScreenType();

  const handleAddClick = () => {
    const now = new Date();
    const end = new Date(now.getTime() + 60 * 60 * 1000);
    dispatch(
      openElementModal({
        mode: "new",
        type: "event",
        selectedId: undefined
      })
    );
  };

  const variant = screenType === "desktop" ? "rounded" : "transper";
  const size = screenType === "desktop" ? "large" : "small";

  return (
    <Button onClick={handleAddClick} variant={variant} size={size}>
      <Plus size={20} className="mr-1 text-main" />
      Add
    </Button>
  );
};

export default AddEventButton;