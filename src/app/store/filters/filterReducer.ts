import { createSlice, PayloadAction } from "@reduxjs/toolkit";




type FilterState ={
  query: string;
  entity: "event" | "todo" | null;
  isFocused: boolean;
}

const initialState: FilterState ={
    query: '',
    entity: null,
    isFocused: false,
}

  
const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
setFilterQuery(state, action:PayloadAction<string>){
    state.query = action.payload;
},
setFilterEntity(state, action: PayloadAction<'event' | 'todo' | null>){
    state.entity = action.payload;
},
clearFilter(state){
    state.query = '';
    state.entity = null;
    state.isFocused = false;
},
setFilterFocus(state, action: PayloadAction<boolean>) {
      state.isFocused = action.payload;
    },
    }
})

export const {setFilterEntity, setFilterQuery, clearFilter, setFilterFocus} = FilterSlice.actions;
export const filterReduser = FilterSlice.reducer;




