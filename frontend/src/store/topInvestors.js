const { fetch } = require('./csrf')

/****Action Types****/
const SET_TOP_INVESTORS = 'GET_TOP_INVESTORS'

/******Action Creators****/
const setTopInvestors = (investors) => ({
  type: SET_TOP_INVESTORS,
  payoload: investors
})

/*****Thunks*****/
export const getTopInvestors = () => async (dispatch) => {
  const investors = await fetch('/backend/api/session/top-investors')
  dispatch(setTopInvestors(investors.data))
}

/*****Reducer*****/
export const topInvestorsReducer = (state = { topAccounts: [] }, action) => {
  switch (action.type) {
    case SET_TOP_INVESTORS:
      return { ...state, topAccounts: action.payoload }
    default:
      return { ...state }
  }
}