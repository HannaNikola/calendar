"use client";

import { Search } from "lucide-react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { usePathname } from "next/navigation";
import {
  clearFilter,
  setFilterEntity,
  setFilterFocus,
  setFilterQuery,
} from "../store/filters/filterReducer";
import {selectFilterResult } from "../store/filters/selector";
import { useEffect} from "react";
import { openElementModal } from "../store/sharedComponent/modalReducer";

export const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const query = useSelector((state: RootState) => state.filter.query);
  const entity = useSelector((state:RootState)=> state.filter.entity)
  const result = useSelector(selectFilterResult)
 


useEffect(()=>{
  if(pathname?.includes('/calendar')){
    dispatch(setFilterEntity('event'))

  } else if(pathname?.includes('/task')){
    dispatch(setFilterEntity('todo'))

  } else{
    dispatch(setFilterEntity(null))
  }
},[pathname, dispatch])



  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setFilterQuery(e.target.value));
    
  };

  const handleClear = () => {
    dispatch(clearFilter());
    dispatch(setFilterFocus(false));
  };

  const handleSelectEvent = (item: any) => {
    if(!item?._id) return

    if(entity === "event"){
      dispatch(
      openElementModal({
        mode: "update",
        type:'event',
        selectedId: item._id,
      })
    );
    }
    if (entity === 'todo'){
      dispatch(
        openElementModal({
          mode: 'update',
          type: 'todo',
          selectedId: item._id
        })
      )
    }
    dispatch(clearFilter())
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="relative w-full">
      <div
        className={`flex items-center gap-2 bg-input-light px-3 py-2 w-full ${
          query ? "rounded-t-3xl" : "rounded-3xl"
        }`}
      >
        <Search size={20} />
        <input
          type="text"
          value={query}
          onFocus={() => dispatch(setFilterFocus(true))}
          onBlur={(e) => {
            if (!e.target.value) dispatch(setFilterFocus(false));
          }}
          onChange={handleChangeValue}
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
        />
        <X onClick={handleClear} size={20} className="cursor-pointer" />
      </div>

      {query && (
        <ul className="absolute top-full left-0 w-full max-sm:w-[370px] z-50 max-h-60 overflow-auto scrollbar-hide rounded-b-3xl bg-input-light shadow-lg text-sm">
          {result.length > 0 ? (
           result.map((item) => (
              <li
                key={item._id}
                onClick={() => handleSelectEvent(item)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.title}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400 italic">Nothing found...</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Filter;



