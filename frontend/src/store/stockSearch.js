import { fetch } from './csrf';

//action types
const SET_STOCK = 'SET_STOCK';
const REMOVE_COMPANY = 'REMOVE_COMPANY'

//action creators
const setStock = (stock) => {
  return {
    type: SET_STOCK,
    payload: stock
  }
}

export const removeCompany = () => ({
  type: REMOVE_COMPANY,
  payload: null
})

//Search basic stock data thunk
export const setStockData = (stock) => async (dispatch) => {
  try {
    const res = await fetch('/api/search', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        stock: stock.toLowerCase()
      })
    })
    dispatch(setStock(res.data))
  }
  catch {
    const error = new Error()
    throw error
  }
}


/***********Reducer**********/
export const stockSearchReducer = (state = { stock: null }, action) => {

  switch (action.type) {
    case SET_STOCK:
      return {
        ...state, stock: action.payload
      }
    case REMOVE_COMPANY:
      return {
        ...state, stock: action.payload
      }
    default:
      return state
  }
}