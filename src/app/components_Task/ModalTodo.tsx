import { ModalWrapper } from "../shared/ui/ModalWrapper"

interface ModalTodoProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "new" | "update";
  selectedTodo?: any; 
}



export const ModalTodo = ({isOpen, onClose, selectedTodo}:ModalTodoProps)=>{

    return(
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <div></div>
        </ModalWrapper>
    )
}