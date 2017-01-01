import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as reduxFormReducer } from 'redux-form'

import LoginForm from './LoginForm.js'

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <LoginForm/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-root')
)
