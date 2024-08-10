import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const Notification = () => {
  
  const [notification, notifDispatch] = useContext(NotificationContext)

  console.log(notification)

  if(notification === null){
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {notification}    
    </div>
  )
}

export default Notification
