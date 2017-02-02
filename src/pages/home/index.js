import React from 'react'
import { Link } from 'react-router'

export default () => (
  <div>
    <h1>Home page</h1>
    <div>
      Read all <Link to="/news">News</Link>
    </div>
  </div>
)
