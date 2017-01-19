import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static fetchData(dispatch, params) {

  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <div>
          Read all <Link to='/news'>News</Link>
        </div>
      </div>
    )
  }
}

export default connect(s => s)(Home)
