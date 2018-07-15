import React from 'react'
import { shallow, mount } from 'enzyme';
import ConnectedHome,{Home} from '../src/js/components/Home'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import Quote from './../../client/components/Quote'

describe('<Quote />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Quote />)
  })

  it('renders', () => {
    expect(wrapper).toBeDefined()
  })
})