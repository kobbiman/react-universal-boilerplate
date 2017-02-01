import React from 'react'

import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { match, RouterContext } from 'react-router'
import xss from 'xss'
import reducers from '../../../src/reducers'
import routes from '../../../src/routes'
import config from '../../../config'

export default async function (ctx) {

  const { error, redirectLocation, renderProps } = await matcher(ctx.request.url)

  if (error) {
    ctx.status = 500
    ctx.body = error.message
  }
  else if (redirectLocation) {
    ctx.status = 302
    ctx.redirect(redirectLocation.pathname + redirectLocation.search)
  }
  else if (renderProps) {

    const store = createStore(reducers, compose(applyMiddleware(thunk)))

    try {
      await Promise.all(fetch(renderProps, store))
    }
    catch(e) { }

    if (process.env.NODE_ENV == 'production') {
      await ctx.render('index', {
        title: 'App',
        store: xss(JSON.stringify(store.getState())),
        body: renderToString(
          <Provider store={ store }>
            <RouterContext { ...renderProps } />
          </Provider>
        )
      })
    }
    else {
      await ctx.render('development', {
        title: '_DEV_',
        store: xss(JSON.stringify(store.getState())),
        jsBundle: `${config.compile.publicPath}/${config.compile.jsBundle}`
      })
    }
  }
  else {
    ctx.status = 404
    ctx.body = 'Not found!'
  }
}

function matcher (location) {
  return new Promise((resolve) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      return resolve({ error, redirectLocation, renderProps })
    })
  })
}

function fetch(renderProps, store) {
  return renderProps.components.map(c => {
    if (c.fetchData)
      return c.fetchData(store.dispatch, renderProps.params)
    else
      return Promise.reslove
  })
}
