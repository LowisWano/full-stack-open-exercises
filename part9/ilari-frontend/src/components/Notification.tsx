import { NotifType } from "../types"

type NotifPropType = {
  notif: NotifType;
}

const Notification = (props: NotifPropType) => {
  const { notif } = props

  const notifStyle = {
    color: "red"
  }

  if(!notif){
    return null
  }

  return(
    <div style={notifStyle}>
      <p>{notif}</p>
    </div>
  )
}

export default Notification