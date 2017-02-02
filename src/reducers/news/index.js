import { types } from '../../actions/news'

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_NEWS:
      return { ...state, ...action.list }

    case types.LOAD_NEWS_DETAIL:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.data
        }
      }

    default:
      return state
  }
}
