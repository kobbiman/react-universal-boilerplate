import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { loadNewsDetail } from '../../actions/news'

class NewsDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.router.params.id
    }
  }

  static fetchData (dispatch, params) {
    return dispatch(loadNewsDetail(params.id))
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { news, dispatch, router } = this.props
    const { id } = this.state

    if (news[id] == null || news[id].desc == null) {
      NewsDetail.fetchData(dispatch, router.params)
    }
  }

  render() {
    const { id } = this.state
    const item = this.props.news[id]

    return (
      <div>
        <h1>{ item.title }</h1>
        <p>{ item.desc } </p>
        <a href={ item.link } target="blank">Read more ...</a>
      </div>
    )
  }
}

export default connect(s => s)(NewsDetail)
