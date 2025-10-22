import { useDispatch } from "react-redux"
import { openElementModal } from "../store/sharedComponent/modalReducer"
import { Plus } from "lucide-react"
import { useEffect } from "react"


export const AddTodoButton = ()=>{

   
   const dispatch = useDispatch()
    return (
        <div>
         <button
          type="button"
          onClick={()=> dispatch(openElementModal({
            type:"todo",
            mode: "newTodo",
            data:{todo: null}
            
          })) }
          className="w-[120px] h-[40px] flex justify-items-start mb-3 p-2 hover:text-dark-text-hover"
        >
          <Plus size={20} className=" mr-1" />
          Add Task
        </button>
        </div>
    )
}


