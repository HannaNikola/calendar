import { Search } from "lucide-react";
import { X } from "lucide-react";

export const Filter = () => {
  return (
    <div className="flex flex-1 items-center gap-2 bg-input-light rounded-3xl  px-3 py-2 mb-4 w-full">
      <Search size={20} />
      <input
        type="text"
        placeholder="Search... I'm not ready yeat"
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
      />

      <X size={20}/>
    </div>
  );
};
export default Filter;
