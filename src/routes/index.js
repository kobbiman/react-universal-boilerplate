import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import layouts
import CoreLayout from '../layouts/core'

// import pages
import Home from '../pages/home'
import News from '../pages/news'
import NewsDetail from '../pages/news-detail'

export default (
  <Route path='/' component={ CoreLayout }>
    <IndexRoute component={ Home } />
    <Route path='news' component= { News } />
    <Route path='news/:id' component= { NewsDetail } />
  </Route>
)
