// UI VENDORS
import React, { Component } from 'react'
// import { Container, Header, Title, Content, Button, Footer, Text } from 'native-base'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
// REDUX VENDORS
import { connect } from 'react-redux'
// REDUX FORM
// GENERIC REDUX FORM
import ConfigFormFields from './ConfigFormFields.js'
import { GenericForm, gReduxForm } from './GenericForm.js'

const configFormFields = new ConfigFormFields('login', {
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
    this.onFormSubmit= this.onFormSubmit.bind(this)
  }
//   componentDidMount() {
//     this.refs[k]            // the Field
//       .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
//       .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
//       .focus()                // on TextField
// }
  onFormSubmit(formData){
    console.log('onFormSubmit')
  }
  render() {
    // debugger
    return (
        <Card>
          <CardHeader
            title="Generic Redux Form"
            subtitle="Example">
          </CardHeader>
          <CardTitle>Login Form</CardTitle>
          <CardText>
            <GenericForm {...this.props}/>
          </CardText>
        </Card>
    )
  }
}

export default gReduxForm(configFormFields)(LoginForm)
