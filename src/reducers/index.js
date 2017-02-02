import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './app'
import news from './news'

export default combineReducers({
  app,
  news,
  routing: routerReducer
})
