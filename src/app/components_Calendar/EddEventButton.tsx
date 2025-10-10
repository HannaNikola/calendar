"use client";
import { Plus } from "lucide-react";
import { Button } from "../shared/ui/Button";
import { useDispatch} from "react-redux";
import { AppDispatch} from "../store/store";
import { useScreenType } from "../hooks/useScreenType";
import {  openElementModal,} from "../store/sharedComponent/modalReducer";
import { toISOString } from "../utils/date";



const AddEventButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const screenType = useScreenType();

  const handleAddClick = () => {
   const now = toISOString(new Date())
   const end = toISOString(new Date(Date.now() + 60 * 60 * 1000))
    dispatch(
      
      openElementModal({
        mode: "new",
        type: "event",
        data:{slotStart: now, slotEnd: end },
       
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