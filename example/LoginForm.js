// UI VENDORS
import React, { Component } from 'react'
// import { Container, Header, Title, Content, Button, Footer, Text } from 'native-base'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
// GENERIC REDUX FORM
import { GenericFormFields, GenericForm, gReduxForm } from 'generic-redux-form'

const genericFormFields = new GenericFormFields('login', {
      email:{
        type: 'input',
        label: 'email',
        required: true,
        placeholder: 'EMAIL',
        iconName: 'ios-person',
        default: 'my@email.com'
      },
      password:{
        type: 'input',
        label: 'password',
        required: true,
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
