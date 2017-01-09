
// UI VENDORS
import React, { Component } from 'react'
import { View } from 'react-native'
import { Card, CardItem, Row, Title,Text, Input, Radio, CheckBox, Slider, Switch, Button } from 'native-base'
// import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card'
// import { RadioButton } from 'material-ui/RadioButton'
// import RaisedButton from 'material-ui/RaisedButton'
// import {List, ListItem} from 'material-ui/List'
// import { TextField, RadioButtonGroup, Checkbox, SelectField, Slider, Toggle } from 'redux-form-material-ui'
import { SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

// GENERIC REDUX FORM
import { GenericFormFields, GenericForm, gReduxForm, Validators } from 'generic-redux-form'
// import { Multiple, GenericSlider, GenericToggle } from 'generic-redux-form/GenericComponentsMUI'
import { Multiple, GenericSlider, GenericToggle } from 'generic-redux-form/GenericComponentsNativeBase'

const CardHeader = (props) => {
  return (
    <CardItem>
      <Text>{props.title}</Text>
      <Text note>{props.subtitle}</Text>
    </CardItem>
)}

const CardTitle = Title
const CardText = CardItem

const RadioButtonGroup = View
const RadioButton = (props) =>
<Row>
  <Radio selected={props.value}/>
  <Text>{props.label}</Text>
</Row>

const TextField = Input // TODO: InputGroup
const Checkbox = CheckBox
// const SelectField = Picker
// const Item = Picker.Item
// const MenuItem = (props) => <Picker.Item label={props.label} value={props.primaryText}/>
const Toggle = (props) =>
<Row>
  <Text>{props.label}</Text>
  <Switch/>
</Row>

const RaisedButton = (props) =>
<Button>
  {props.label}
</Button>

const genericFormFields = new GenericFormFields('login', {
  FormButtons:{
    component: RaisedButton,
  },
  Multiple:{
    component: Multiple,
  },
  // email:{
  //   label: 'email',
  //   validator: [Validators.email,Validators.required],
  //   component: TextField,
  //   placeholder: '__@__.__',
  //   defaultValue: '',
  //   withRef: true,
  //   ref: 'firstField'
  // },
  // password:{
  //   label: 'password',
  //   validator: Validators.required,
  //   component: TextField,
  //   placeholder: 'PASSWORD',
  //   defaultValue: '',
  // },
  sex:{
    type: 'radiobutton',
    label: 'sex',
    validator: Validators.noValidation,
    component: (props) =>
    <RadioButtonGroup name="sex">
      <RadioButton value={false} label="man"/>
      <RadioButton value="woman" label="woman"/>
    </RadioButtonGroup>,
    defaultValue: 'man',
  },
  // criterions:{
  //   type: 'slider',
  //   label: 'criterions',
  //   labels: ['value','effort', 'risk'],
  //   validator: Validators.noValidation,
  //   component: GenericSlider,
  //   limits: {min: 0, max: 50, step: 1},
  //   defaultValue: 0,
  // },
  // published:{
  //   type: 'toggle',
  //   label: 'Published',
  //   labelPosition: 'right',
  //   validator: Validators.noValidation,
  //   component: Toggle,
  //   defaultValue: false,
  // },
  settings:{
    type: 'toggle',
    label: 'settings',
    labels: ['PRICE OPTIMIZATION','TIME OPTIMIZATION', 'QUALITY OPTIMIZATION'],
    labelPosition: 'right',
    validator: Validators.noValidation,
    component: Toggle, //GenericToggle,
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
  // options:{
  //   type: 'checkbox',
  //   label: 'options',
  //   labels: ['travel','real estate', 'automotive'],
  //   validator: Validators.noValidation,
  //   component: Checkbox,
  //   defaultValue: false,
  // },
})

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: "key0",
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (event, index, value) => this.setState({value})
  render() {
    return (
        <Card>
          <CardHeader title="Generic Redux Form" subtitle="Native Base Example"></CardHeader>
          <CardTitle>TITLE</CardTitle>
          <CardText>
            <GenericForm {...this.props}/>
          </CardText>
        </Card>
    )
    // return (
    //     <Card>
    //       <CardHeader
    //         title="Generic Redux Form"
    //         subtitle="Material UI Example">
    //       </CardHeader>
    //       <CardTitle>Login Form</CardTitle>
    //       <CardText>
    //         <GenericForm {...this.props}/>
    //       </CardText>
    //     </Card>
    // )
  }
}

export default gReduxForm(genericFormFields)(LoginForm)
