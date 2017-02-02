import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import nock from 'nock'
import { Provider } from 'react-redux'
import { Link } from 'react-router'
import store from '../../store'
import News from '.'

const Component = () => (
  <Provider store={store}>
    <News />
  </Provider>
)

describe('<News/>', function () {

  beforeEach(function() {
    nock('http://localhost:4000')
    .get('/api/news')
    .reply(200, {
      1: { title: 'News1'},
      2: { title: 'News2'},
      3: { title: 'News3'},
    })
  })

  it('should have news section', function () {
    const wrapper = mount(<Component />)
    expect(wrapper.find('.news')).to.have.length(1)
  })

  it('should render all news', function () {
    const wrapper = mount(<Component />)
    expect(wrapper.find('.news-item')).to.have.length(3)
  })
})
