import { types } from 'Actions/app'

const initialState = {
  status: null
}

export default (state = initialState, action) => {

  switch (action.type) {
    case types.SET_STATUS:
      return { ...state, ...{ status: action.status } }

    default:
      return state
  }
}
