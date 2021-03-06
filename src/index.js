import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

const rootEl = document.getElementById('app')

ReactDOM.render(<App />, rootEl)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl,
    )
  })
}
