import React from 'react'
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import styles from './styles/main.scss'
import store from './store'
import routes from './routes'

const history = syncHistoryWithStore(browserHistory, store)

export default class App extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <Router
          key={ new Date() } // https://github.com/ReactTraining/react-router/issues/2704
          history={ history }
          routes={ routes }
        />
      </Provider>
    )
  }
}
