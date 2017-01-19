import React from 'react'
import { Link } from 'react-router'
export default class Core extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="header">
          <Link to='/'>Home</Link>
          <Link to='/news'>News</Link>
        </div>

        { this.props.children }
      </div>
    )
  }
}
