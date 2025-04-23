import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";




axios.defaults.baseURL = "https://calendar-back-end-s3b2.onrender.com";

// solition for render.com free version

export const fetchEventsApi = createAsyncThunk(
    "allEvents/fetchAll",
    async (_, thunkAPI) => {
      const maxRetries = 3;
      let attempt = 0;
  
      while (attempt < maxRetries) {
        try {
          const response = await axios.get("/api/events");
          console.log(response)
          return response.data;
        } catch (error) {
          attempt++;
          const err = error as AxiosError;
          console.error(`Attempt ${attempt} failed:`, err.message);
  
          if (attempt >= maxRetries) {
            return thunkAPI.rejectWithValue(
              err.response?.data || "Something went wrong"
            );
          }
  
         
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }
    }
  );
  
  

// export const fetchEventsApi = createAsyncThunk(
//   "allEvents/fetchAll",
//   async (_, thunkAPI) => {
    
    
//       try {
//         const response = await axios.get("/api/events");
//         console.log(response)
//         return response.data;
//       } catch (error) {
//         const err = error as AxiosError;
//         console.error("Fetch error:", err);
//         return thunkAPI.rejectWithValue(
//           err.response?.data || "Something went wrong"
//         );

//       } 
      
//     }
  
// );
  
  export const addEventApi = createAsyncThunk(
    "eventItem/addEvent",
    async (newEvent:{ title: string; start: Date; end: Date; allDay: boolean; addTask: boolean }, thunkAPI) => {
      try {
        const payload = {
          ...newEvent,
          start: newEvent.start.toISOString(),
          end: newEvent.end.toISOString(),
        };
        const response = await axios.post("/api/events", newEvent);
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        console.error("Fetch error:", err);
        return thunkAPI.rejectWithValue(
          err.response?.data || "Something went wrong"
        );
      }
    }
  );


export const deleteEventApi =createAsyncThunk<string, string>(
  "eventItem/deleteEvent",
  async(id, thunkApi)=>{
    try{
      const response = await axios.delete(`/api/events/${id}`)
      console.log(response.data._id)
      return response.data
    }catch(error){
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.data || "Something went wrong" )
    }
  }
)