import agent from 'superagent'

// constants
export const types = {
  LOAD_NEWS: '__LOAD_NEWS__',
  LOAD_NEWS_DETAIL: '__LOAD_NEWS_DETAIL__'
}

export function loadNews () {

  return async dispatch => {
    const response = await agent('http://localhost:4000/api/news')
    dispatch(_load_news(response.body))
  }
}

export function loadNewsDetail (id) {
  return async dispatch => {
    const response = await agent(`http://localhost:4000/api/news/${id}`)
    dispatch(_load_news_detail(id, response.body))
  }
}

export function loadNewsInfo (id) {
  return async dispatch => {
    const response = await agent(`http://localhost:4000/api/news/info/${id}`)
    dispatch(_load_news_detail(id, response.body))
  }
}

function _load_news(list) {

  return {
    type: types.LOAD_NEWS,
    list
  }
}

function _load_news_detail(id, data) {

  return {
    type: types.LOAD_NEWS_DETAIL,
    id,
    data
  }
}
