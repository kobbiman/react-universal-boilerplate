import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import routes from './routes'
import './styles/main.scss'

const history = syncHistoryWithStore(browserHistory, store)

export default () => (
  <Provider store={store}>
    <Router
      key={new Date()} // https://github.com/ReactTraining/react-router/issues/2704
      history={history}
      routes={routes}
    />
  </Provider>
)
