// UI VENDORS
import React, { Component } from 'react'
// import { Container, Header, Title, Content, Button, Footer, Text } from 'native-base'
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card'
import { TextField } from 'redux-form-material-ui'
// GENERIC REDUX FORM
import { GenericFormFields, GenericForm, gReduxForm, Validators } from 'generic-redux-form'

const genericFormFields = new GenericFormFields('login', {
      email:{
        type: 'input',
        label: 'email',
        validator: Validators.email,
        component: TextField,
        placeholder: 'EMAIL',
        default: 'my@email.com',
      },
      password:{
        type: 'input',
        label: 'password',
        validator: Validators.required,
        component: TextField,
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
