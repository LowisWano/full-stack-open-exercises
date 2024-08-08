import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlicer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action){
      return action.payload
    }
  }
})

export const { notify } = notificationSlicer.actions
export default notificationSlicer