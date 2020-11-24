import { fetch } from './csrf';

const SET_STOCK = 'SET_STOCK';

const setStock = (stock) => {
  console.log({ stock });
  return {
    type: SET_STOCK,
    payload: stock
  }
}

//Search thunk
export const searchForStock = (stock) => async (dispatch) => {

  const stockQuote = await fetch('/api/search', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      stock
    })
  })
  dispatch(setStock(stockQuote.data))
}

/***********Reducer**********/
export const stockSearchReducer = (state = { stock: null }, action) => {

  switch (action.type) {
    case SET_STOCK:
      return {
        ...state, stock: action.payload
      }
    default:
      return state
  }
}