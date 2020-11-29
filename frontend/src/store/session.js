import { fetch } from './csrf';

//action types
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_ACCOUNT_STOCK = 'SET_ACCOUNT_STOCK';

//action creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

export const removeUser = () => ({
  type: REMOVE_USER,
})

const setAccount = (account) => ({
  type: SET_ACCOUNT,
  payload: account
})

const setAccountPortfolio = (stock) => ({
  type: SET_ACCOUNT_STOCK,
  payload: stock
})

//Login thunk function
export const logUserIn = (user) => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential: user.credentials,
      password: user.password,
    }),
  })
  dispatch(setUser(res.data.user))        //this will send setUser with to the reducer 
  dispatch(setAccount(res.data.account))    //with a payload of the returned fetch call data
  return res;                       
}

//Restore User thunk 
export const restoreUser = (user) => async (dispatch) => {
  const res = await fetch('/api/session');
  console.log('RES', res);
  dispatch(setUser(res.data.user))
  dispatch(setAccount(res.data.account))
  dispatch(setAccountPortfolio(res.data.stocks))
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

//create account thunk
export const createAccount = (account) => async (dispatch) => {
  const { userId, name } = account;
  const res = await fetch('/api/create-account', {
    method: 'POST',
    body: JSON.stringify({
      userId, name
    })
  })
  dispatch(setAccount(res.data.account))
  return res;
}

/***********Reducer**********/
export const sessionReducer = (state = { user: null, account: null, accountPortfolio: null }, action) => {

  switch (action.type) {
    case SET_USER:
      return {
        ...state, user: action.payload
      }
    case REMOVE_USER:
      return { user: null }
    case SET_ACCOUNT:
      return {
        ...state, account: action.payload
      }
      case SET_ACCOUNT_STOCK:
        return {
          ...state, accountPortfolio: action.payload
        }
    default:
      return state
  }
}