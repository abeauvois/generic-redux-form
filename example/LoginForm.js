// UI VENDORS
import React, { Component } from 'react'
// import { Container, Header, Title, Content, Button, Footer, Text } from 'native-base'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import {
  // AutoComplete,
  // Checkbox,
  // DatePicker,
  // TimePicker,
  // RadioButtonGroup,
  // SelectField,
  // Slider,
  TextField,
  // Toggle
} from 'redux-form-material-ui'
// GENERIC REDUX FORM
import { GenericFormFields, GenericForm, gReduxForm } from 'generic-redux-form'

// validation functions
const required = value => value == null ? ERROR_REQUIRED : undefined
const email = value => value &&
!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? ERROR_INVALID_EMAIL : undefined


const genericFormFields = new GenericFormFields('login', {
      email:{
        type: 'input',
        label: 'email',
        validator: required,
        placeholder: 'EMAIL',
        iconName: 'ios-person',
        default: 'my@email.com'
      },
      password:{
        type: 'input',
        label: 'password',
        validator: email,
        component:
        iconName: 'ios-lock',
        placeholder: 'PASSWORD',
        default: 'test',
    }
  })

class LoginForm extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
        <Card>
          <CardHeader
            title="Generic Redux Form"
            subtitle="Material UI Example">
          </CardHeader>
          <CardTitle>Login Form</CardTitle>
          <CardText>
            <GenericForm {...this.props}/>
          </CardText>
        </Card>
    )
  }
}

export default gReduxForm(genericFormFields)(LoginForm)
