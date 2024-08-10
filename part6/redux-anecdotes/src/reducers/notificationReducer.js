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

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(notifyVote(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer