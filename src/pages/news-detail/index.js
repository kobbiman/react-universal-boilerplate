import React from 'react'
import { connect } from 'react-redux'
import { loadNewsDetail } from '../../actions/news'
import NewsInfo from './info'

class NewsDetail extends React.Component {

  static fetchData(dispatch, params) {
    dispatch(loadNewsDetail(params.id))
    return NewsInfo.fetchData(dispatch, params)
  }

  static propTypes = {
    news: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      id: this.props.router.params.id
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch() {
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
          <img src="/static/images/loading.gif" alt="loading" />
        }

        <p>{ item.desc } </p>
        <a href={item.link} target="blank">Read more ...</a>

        <NewsInfo id={id} />
      </div>
    )
  }
}

export default connect(s => s)(NewsDetail)
