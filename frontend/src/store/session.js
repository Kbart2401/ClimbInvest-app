import thunk from 'redux-thunk';
import { fetch } from './csrf';


const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export const logUserIn = (user) => async (dispatch, getState) => {
  const res = await fetch('/api/session', {
    method: 'POST', 
    body: JSON.stringify({
    credential: user.credential,
      password: user.password,
    }),
  })
  dispatch(setUser(res.data.user))
}
const setUser = (user) => ({
  type: LOGGED_IN,
  payload: user
})

export const removeUser = () => ({
  type: LOGGED_OUT,
})


export const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        user: action.payload
      }
    case LOGGED_OUT:
      return { user: null }
    default:
      return state
  }
}