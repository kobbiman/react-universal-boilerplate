import { applyMiddleware, createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import config from '../../config'

const composer = config.env == 'production'? compose: composeWithDevTools

const initialState = window.__APPLICATION_STATE__ ? JSON.parse(window.__APPLICATION_STATE__) : {}

const store = createStore(reducer, initialState, composer(
  applyMiddleware(thunk),
))

if (config.env == 'development' && module.hot) {
  module.hot.accept('../reducers', () => {
    store.replaceReducer(require('../reducers').default)
  })
}

export default store
