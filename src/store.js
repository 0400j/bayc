import { configureStore, createSlice } from '@reduxjs/toolkit'

let cart = createSlice({
   name : 'cart',
   initialState : [
   ],
   reducers : {
     addItem(state, action){
        state.push(action.payload);
     }
   }
})
export let { addItem} = cart.actions

export default configureStore({
  reducer: { 
      cart2 : cart.reducer
  }
}) 