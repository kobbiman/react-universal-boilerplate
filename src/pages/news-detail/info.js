import React from 'react'
import { connect } from 'react-redux'
import { loadNewsInfo } from '../../actions/news'

class NewsInfo extends React.Component {

  constructor(props) {
    super(props)
  }

  static fetchData (dispatch, params) {
    return dispatch(loadNewsInfo(params.id))
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const news = this.props.news[this.props.id]

    return (
      <div style={{ marginTop: '30px', color: 'gray' }}>
        <div>views: { news.views }</div>
        <div>clicks: { news.clicks }</div>
      </div>
    )
  }
}

export default connect(s => s)(NewsInfo)
