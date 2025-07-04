import { Plus } from "lucide-react"
import { Button } from "../shared/ui/Button"


type EddEventButtonProps = {
    onAddClick: ()=> void
}
const EddEventButton=()=>{
    return(
        <div>
           <Button 
           variant='rounded' size='large'
           ><Plus size={20} className="mr-1" />Add</Button>
        </div>
    )
}

export default EddEventButton