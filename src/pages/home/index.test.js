import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import { Link } from 'react-router'
import Home from '.'

describe('<Home/>', function () {
  it('should have news link', function () {
    const wrapper = shallow(<Home/>)

    const newsLink = wrapper.find(Link)
    expect(newsLink).to.have.length(1)
    expect(newsLink.props().to).to.equal('/news')
  })
})
