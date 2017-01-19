import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { loadNewsDetail } from '../../actions/news'
import NewsInfo from './info'

class NewsDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      id: this.props.router.params.id
    }
  }

  static fetchData (dispatch, params) {
    dispatch(loadNewsDetail(params.id))
    return NewsInfo.fetchData(dispatch, params)
  }

  componentDidMount() {
    const { news, dispatch, router } = this.props
    const { id } = this.state

    if (news[id] == null || news[id].desc == null) {
      this.setState({ loading: true })
      NewsDetail.fetchData(dispatch, router.params).then(() => {
        this.setState({ loading: false })
      })
    }
  }

  render() {
    const { id } = this.state
    const item = this.props.news[id]

    return (
      <div>

        <h1>{ item.title }</h1>

        {
          this.state.loading &&
          <img src="/static/images/loading.gif" />
        }

        <p>{ item.desc } </p>
        <a href={ item.link } target="blank">Read more ...</a>

        <NewsInfo id={id} />
      </div>
    )
  }
}

export default connect(s => s)(NewsDetail)
