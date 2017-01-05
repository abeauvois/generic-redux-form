import injectTouchTapEvent from 'react-tap-event-plugin'
injectTouchTapEvent()
// UI VENDORS
import React, { Component } from 'react'
// import { Container, Header, Title, Content, Button, Footer, Text } from 'native-base'
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card'
import { RadioButton } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
// import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { TextField, RadioButtonGroup, Checkbox, SelectField, Slider, Toggle } from 'redux-form-material-ui'
// GENERIC REDUX FORM
import { GenericFormFields, GenericForm, gReduxForm, Validators } from 'generic-redux-form'

const genericFormFields = new GenericFormFields('login', {
  FormButtons:{
    component: RaisedButton,
  },
  email:{
    label: 'email',
    validator: [Validators.email,Validators.required],
    component: TextField,
    placeholder: '__@__.__',
    defaultValue: '',
    withRef: true,
    ref: 'firstField'
  },
  password:{
    label: 'password',
    validator: Validators.required,
    component: TextField,
    placeholder: 'PASSWORD',
    defaultValue: '',
  },
  sex:{
    type: 'radiobutton',
    label: 'sex',
    validator: Validators.noValidation,
    component: (props) =>
    <RadioButtonGroup name="sex">
      <RadioButton value="man" label="man"/>
      <RadioButton value="woman" label="woman"/>
    </RadioButtonGroup>,
    defaultValue: 'man',
  },
  proximity:{
    type: 'slider',
    label: 'proximity',
    validator: Validators.noValidation,
    component: Slider,
    limits: {min: 0, max: 50, step: 2},
    defaultValue: 6,
  },
  published:{
    type: 'toggle',
    label: 'Published',
    labelPosition: 'right',
    validator: Validators.noValidation,
    component: Toggle,
    defaultValue: false,
  },
  category:{
    type: 'dropdown',
    label: 'category',
    validator: Validators.noValidation,
    component: (props) => <SelectField {...props}>
      <MenuItem value="Immobilier" primaryText="Immobilier"/>
      <MenuItem value="Auto" primaryText="Auto"/>
      <MenuItem value="Voyage" primaryText="Voyage"/>
    </SelectField>,
    defaultValue: "Voyage",
  },
  options:{
    type: 'checkbox',
    label: 'options',
    labels: ['travel','real estate', 'automotive'],
    validator: Validators.noValidation,
    component: Checkbox,
    defaultValue: false,
  },
})

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: "Auto",
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event, index, value) => this.setState({value})

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
