import React from 'react'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

import Quote from '../../client/components/Quote'

describe('<Quote />', () => {
  const mockStore = configureStore()
  
  let wrapper, store
  const initialState = {
    auth: {
      isFetching: false,
      isAuthenticated: false,
      user: null,
      errorMessage: ''
    },
    quote: {
      isFetching: false,
      errorMessage: '',
      quote: 'heyo'
    }
  }

  beforeEach(() => {
    store = mockStore(initialState)

    wrapper = shallow(
      <Quote store={store}/>
    )
  })

  it('renders', () => {
    expect(wrapper).toBeDefined()
  })

  it('has tow buttons', () => {
    console.log(wrapper.dive().html());
    
    expect(wrapper.find('button')).toHaveLength(2)
  })
})