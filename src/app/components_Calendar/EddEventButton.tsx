'use client'
import { Plus } from "lucide-react"
import { Button } from "../shared/ui/Button"
import { ModalEvent } from "./ModalEvent"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { openModal } from "../store/redux/modalReducer";



// type EddEventButtonProps = {
//     onAddClick: ()=> void
// }
// const EddEventButton=()=>{
//     const dispatch = useDispatch<AppDispatch>();
    
//     const { isModalOpen, modalType, selectedEvent, slotStart, slotEnd } =
//     useSelector((state: RootState) => state.modal);
//     return(
//         <div>
//            <Button 
//            onClick={()=> dispatch(openModal)}
//            variant='rounded' size='large'
//            ><Plus size={20} className="mr-1" />Add</Button>
//            {/* <ModalEvent
//                      type={modalType}
//                      isOpen={isModalOpen}
//                      onClose={() => dispatch(closeModal())}
//                      slotStart={slotStart}
//                      slotEnd={slotEnd}
//                      selectedEvent={selectedEvent}
//                      handelAddEvent={handelAddEvent}
//                      handelUpdateEvent={handelUpdateEvent}
//                      handleDeleteEvent={handleDeleteEvent}
//                    /> */}
//         </div>
//     )
// }

// export default EddEventButton


type AddEventButtonProps = {
    onAddClick?: () => void
}

const AddEventButton = ({ onAddClick }: AddEventButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();
    
    // const { isModalOpen, modalType, selectedEvent, slotStart, slotEnd } =
    //     useSelector((state: RootState) => state.modal);

    const handleAddClick = () => {
        const now = new Date();
        const end = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later
        
        dispatch(
            openModal({
                type: "new",
                slotStart: now,
                slotEnd: end,
                selectedEvent: null
            })
        );
        
        if (onAddClick) {
            onAddClick();
        }
    };

    

    return (
        <div>
            <Button 
                onClick={handleAddClick}
                variant='rounded' 
                size='large'
            >
                <Plus size={20} className="mr-1" />Add
            </Button>
            
            {/* <ModalEvent
                type={modalType}
                isOpen={isModalOpen}
                onClose={() => dispatch(closeModal())}
                slotStart={slotStart}
                slotEnd={slotEnd}
                selectedEvent={selectedEvent}
                handelAddEvent={handelAddEvent}
               
            /> */}
        </div>
    )
}

export default AddEventButton;