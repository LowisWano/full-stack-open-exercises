const Notification = ({ message, notifType })=>{
  if(message==null){
      return null;
  }

  const notifStyle = notifType == 'success'? 'success':'error';
  return (
      <div className={notifStyle}>
          {message}
      </div>
  )
}

export default Notification;