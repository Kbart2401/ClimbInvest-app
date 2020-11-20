import thunk from 'redux-thunk';
import { fetch } from './csrf';


const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

//thunk function
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


export const sessionReducer = (state = { user: null }, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload, state
      }
    case REMOVE_USER:
      return { user: null }
    default:
      return state
  }
}