import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteTodoApi } from "../api/todoApi";
import { closeElementModal } from "../store/sharedComponent/modalReducer";



export const useTodoHandlers =() =>{
     const dispatch = useDispatch<AppDispatch>();
      const { todos } = useSelector((state: RootState) => state.todo);
    const { selectedItem, type } = useSelector((state:RootState)=>state.modal)

      

    const handeDeleteTodo = (todoId: string, closeModal = false) => {
    dispatch(deleteTodoApi(todoId));

    if (closeModal && type === "todo") {
      dispatch(closeElementModal());
    }
  };

        return {
           handeDeleteTodo 
        }
}