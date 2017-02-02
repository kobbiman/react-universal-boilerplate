import agent from 'superagent'

// constants
export const types = {
  LOAD_NEWS: '__LOAD_NEWS__',
  LOAD_NEWS_DETAIL: '__LOAD_NEWS_DETAIL__'
}


function _loadNews(list) {
  return {
    type: types.LOAD_NEWS,
    list
  }
}

function _loadNewsDetail(id, data) {
  return {
    type: types.LOAD_NEWS_DETAIL,
    id,
    data
  }
}

export function loadNews() {
  return async (dispatch) => {
    const response = await agent('http://localhost:4000/api/news')
    dispatch(_loadNews(response.body))
  }
}

export function loadNewsDetail(id) {
  return async (dispatch) => {
    const response = await agent(`http://localhost:4000/api/news/${id}`)
    dispatch(_loadNewsDetail(id, response.body))
  }
}

export function loadNewsInfo(id) {
  return async (dispatch) => {
    const response = await agent(`http://localhost:4000/api/news/info/${id}`)
    dispatch(_loadNewsDetail(id, response.body))
  }
}
