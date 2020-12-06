import { fetch } from './csrf';


//action types
const ADD_STOCK = 'ADD_STOCK';

//action creators
const addStock = (cost, name) => {
  return {
    type: ADD_STOCK,
    cost, name
  }
}

//thunks
export const addNewStock = ({name, symbol, costBasis, accountId, quantity}) => async (dispatch) => {
  const createStock = await fetch('/api/trade', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name, symbol, cost_basis: costBasis, accountId, quantity
    })
  })
  dispatch(addStock(createStock.data.addStock, createStock.data.findStock))
}

/********Reducer*********/
export const stockTradeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_STOCK:
      return {
        ...state, stock: {
          cost: action.cost,
          name: action.name
        }
      }
    default:
      return state
  }
}