import { fetch } from './csrf';

//action types
const SET_STOCK = 'SET_STOCK';
const SET_COMPANY = 'SET_COMPANY';
const REMOVE_COMPANY = 'REMOVE_COMPANY'

//action creators
const setStock = (stock) => {
  return {
    type: SET_STOCK,
    payload: stock
  }
}

const setCompany = (stock) => {
  return {
    type: SET_COMPANY,
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
    debugger
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

//Search company info thunk
export const setCompanyInfo = (company) => async (dispatch) => {
  const companyInfo = await fetch('/api/search/company_data', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      company
    })
  })
  dispatch(setCompany(companyInfo.data))
}


/***********Reducer**********/
export const stockSearchReducer = (state = { stock: null, company: null }, action) => {

  switch (action.type) {
    case SET_STOCK:
      return {
        ...state, stock: action.payload
      }
    case SET_COMPANY:
      return {
        ...state, company: action.payload
      }
    case REMOVE_COMPANY:
      return {
        ...state, stock: action.payload, company: action.payload
      }
    default:
      return state
  }
}