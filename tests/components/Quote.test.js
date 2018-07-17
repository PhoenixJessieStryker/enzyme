import React from 'react'
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'

import '../setup-dom'

import ConnectedQuote, { Quote } from '../../client/components/Quote'
import thunk from 'redux-thunk'

jest.mock('../../client/actions/quote.js', () => ({
  fetchQuote: () => dispatch => dispatch({
    type: 'TEST',
    quote: "If a Quiz is Quizzical, what's a test?"
  }),
  fetchSecretQuote: () => dispatch => dispatch({
    type: 'SECRET_TEST',
    quote: 'secret'
  })
}))

describe('<Quote />', () => {
  let wrapper;

  describe('unconnected', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Quote />
      )
    })

    it('renders', () => {
      expect(wrapper).toBeDefined()
    })

    it('has tow buttons', () => {
      expect(wrapper.find('button')).toHaveLength(2)
    })

    it('quote in props causes render with p tag', () => {
      const fakeQuote = 'What goes around\'s all around, Mr Lahey'

      wrapper.setProps({
        quote: fakeQuote
      })

      console.log(wrapper.props());
      

      const ptags = wrapper.find('p')
      expect(ptags).toHaveLength(1)
      expect(ptags.first().text()).toEqual(fakeQuote)
      // end()
    })
  })


  const mockStore = configureStore([thunk])

  let store
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
      quote: ''
    }
  }

  describe('connected', () => {
    beforeEach(() => {
      store = mockStore(initialState)

      wrapper = shallow(
        <ConnectedQuote store={store} />
      )
    })


    it('clicking public quote button dispatches fetchQuote action', () => {
      wrapper.dive().find('.public-quote').simulate('click')

      let actions = store.getActions()
      expect(actions).toHaveLength(1)
      expect(actions[0]).toEqual({
        type: 'TEST',
        quote: "If a Quiz is Quizzical, what's a test?"
      })
    })

    it('clicking secret quote button dispatches fetchSecretQuote action', () => {
      wrapper.dive().find('.secret-quote').simulate('click')

      let actions = store.getActions()

      expect(actions).toHaveLength(1)
      expect(actions[0]).toEqual({
        type: 'SECRET_TEST',
        quote: "secret"
      })
    })

    it('empty quote in props causes render without enclosing p tag', () => {
      expect(wrapper.dive().find('p')).toHaveLength(0)
    })

    
  })
})