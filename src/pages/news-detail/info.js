import React from 'react'
import { connect } from 'react-redux'
import { loadNewsInfo } from '../../actions/news'

class NewsInfo extends React.Component {

  static fetchData(dispatch, params) {
    return dispatch(loadNewsInfo(params.id))
  }

  static propTypes = {
    news: React.PropTypes.object.isRequired,
    id: React.PropTypes.string.isRequired
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
