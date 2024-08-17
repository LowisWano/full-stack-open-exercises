import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type){
    case 'NOTIFY': {
      return action.payload
    }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notifDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notifDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotifValue = () => {
  const notifArr = useContext(NotificationContext)
  return notifArr[0]
}

export const useNotifDispatch = () => {
  const notifArr = useContext(NotificationContext)
  return notifArr[1]
}


export const useNotify = () => {
  const notifDispatch = useNotifDispatch()

  const displayNotif = (type, message) => {
    notifDispatch({
      type: 'NOTIFY',
      payload: {
        type: type,
        message: message
      }
    })

    setTimeout(() => {
      notifDispatch({
        type: 'NOTIFY',
        payload: null
      })
    }, 5000)
  };

  return {
    displayNotif
  }
}

export default NotificationContext 