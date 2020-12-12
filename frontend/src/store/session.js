import { fetch } from './csrf';

/*****Action Types*******/
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_ACCOUNT_STOCK = 'SET_ACCOUNT_STOCK';
const DECREASE_AVAILABLE_CASH = 'DECREASE_AVAILABLE_CASH';
const ADD_STOCK = 'ADD_STOCK';
const REMOVE_STOCK = 'REMOVE_STOCK'

/*******Action Creators*******/
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

const setCash = (accountCash) => ({
  type: DECREASE_AVAILABLE_CASH,
  payload: accountCash
})

const addStock = (newStock) => {
  return {
    type: ADD_STOCK,
    payload: newStock,
    name: newStock.name
  }
}

const removeStock = () => {
  return {
    type: REMOVE_STOCK,
  }
}

/*********Thunks*********/
//Login thunk 
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

//decrease available cash thunk
export const decreaseCash = (accountId, amount) => async (dispatch) => {
  const res = await fetch('/api/trade', {
    method: 'PATCH',
    body: JSON.stringify({ accountId, amount })
  })
  dispatch(setCash(res.data.accountCash))
}

//Buy Stock
export const addNewStock = ({ name, symbol, costBasis, accountId, quantity }) => async (dispatch) => {
  const createStock = await fetch('/api/trade', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name, symbol: symbol.toLowerCase(), cost_basis: costBasis, accountId, quantity
    })
  })
  dispatch(addStock(createStock.data))
}

//Sell Stock
export const sellStock = ({ symbol, costBasis, accountId, quantity }) => async (dispatch) => {
  const soldStock = await fetch('/api/trade', {
    method: 'DELETE',
    body: JSON.stringify({
      symbol: symbol.toLowerCase(), cost_basis: costBasis, accountId, quantity
    })
  })
  dispatch(removeStock())
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
    case DECREASE_AVAILABLE_CASH:
      return {
        ...state, account: { ...state.account, available_cash: action.payload }
      }
    case ADD_STOCK:
      for (let i = 0; i < state.accountPortfolio.length; i++) {
        let stock = state.accountPortfolio[i]
        if (stock.name === action.name) {
          state.accountPortfolio[i] = action.payload
          break
        }
        else if(i === state.accountPortfolio.length - 1) {
          state.accountPortfolio = [...state.accountPortfolio, action.payload]
        }
      }
      return {
        ...state, accountPortfolio: [...state.accountPortfolio]
      }
    default:
      return state
  }
}