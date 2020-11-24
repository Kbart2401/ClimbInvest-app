import { fetch } from './csrf';


const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';


//Login thunk function
export const logUserIn = (user) => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential: user.credentials,
      password: user.password,
    }),
  })
  dispatch(setUser(res.data.user))   //this will send setUser with to the reducer 
  return res;                       //with a payload of the returned fetch call data
}

const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

export const removeUser = () => ({
  type: REMOVE_USER,
})

//Restore User thunk function
export const restoreUser = user => async (dispatch) => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user))
  return res;
}
//Signup thunk
export const signUpUser = user => async (dispatch) => {
  const { username, email, password } = user;
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  dispatch(setUser(res.data.user))
  return res;
}

//Logout thunk
export const logOutUser = () => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
}



/***********Reducer**********/
export const sessionReducer = (state = { user: null }, action) => {
  
  switch (action.type) {
    case SET_USER:
      return {
        ...state, user: action.payload
      }
    case REMOVE_USER:
      return { user: null }
    default:
      return state
  }
}