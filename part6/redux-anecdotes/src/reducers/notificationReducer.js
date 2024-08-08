import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notifyVote(state, action){
      return action.payload
    },
    clearNotification(){
      return initialState
    }
  }
})

export const { notifyVote, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer