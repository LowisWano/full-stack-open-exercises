import { createContext, useContext, useReducer } from 'react'

const userReducer = (state = null, action) => {
  switch (action.type){
    case 'LOGIN': {
      return action.payload
    }
    case 'LOGOUT': {
      return action.payload
    }
    
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch] }>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userArr = useContext(UserContext)
  return userArr[0]
}

export const useUserDispatch = () => {
  const userArr = useContext(UserContext)
  return userArr[1]
}


export default UserContext
