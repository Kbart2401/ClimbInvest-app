import { fetch } from './csrf';


//action types
const ADD_STOCK = 'ADD_STOCK';

//action creators
const addStock = (stock) => {
  return {
    type: ADD_STOCK,
    payload: stock
  }
}

//thunks
export const addNewStock = ({name, symbol, price}) => async (dispatch) => {
  const createStock = await fetch('/api/trade', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name, symbol, price
    })
  })
}

/********Reducer*********/
export const stockTradeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_STOCK:
      return {
        ...state, stock: action.payload
      }
    default:
      return state
  }
}