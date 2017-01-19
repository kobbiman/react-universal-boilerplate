import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { default as app } from './app'
import { default as news } from './news'

export default combineReducers({
  app,
  news,
  routing: routerReducer
})
