import React from 'react'
import { AppRegistry, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { OSTheme } from 'native-base'

import LoginForm from './LoginForm.js'

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
function Entry() {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <LoginForm/>
      </MuiThemeProvider>
    </Provider>
  )
}
//Use IOS theme for our web app
OSTheme.setOSTheme('ios');

AppRegistry.registerComponent('App', () => Entry);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root')
});
