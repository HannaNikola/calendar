import { createSlice, PayloadAction } from "@reduxjs/toolkit";




type FilterState ={
  query: string;
  entity: "event" | "todo" | null;
}

const initialState: FilterState ={
    query: '',
    entity: null,
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
},
    }
})

export const {setFilterEntity, setFilterQuery, clearFilter} = FilterSlice.actions;
export const filterReduser = FilterSlice.reducer;

