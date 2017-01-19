import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _ from 'underscore'
import { loadNews } from '../../actions/news'

class News extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  static fetchData (dispatch, params) {
    return dispatch(loadNews())
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { news, dispatch } = this.props

    if (_.size(news) <= 1) {

      this.setState({ loading: true })

      News.fetchData(dispatch).then(() => {
        this.setState({ loading: false })
      })
    }
  }

  render() {
    return (
      <div className="news">
        <h1>Top news!</h1>
        {
          this.state.loading &&
          <div>Loading news ...</div>
        }

        {
          _.map(this.props.news, (news, key) => {
            return (
              <div key={`NEWS_${key}`} className="news-item">
                <Link to={`/news/${key}`}>{ news.title }</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default connect(s => s)(News)
