
// UI VENDORS
import React, { Component } from 'react'
import { View } from 'react-native'
import { CheckBox, List, ListItem, Card, CardItem, Row, Title,
  Text, Input, Radio, Slider, Switch, Button } from 'native-base'
// import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card'
// import { RadioButton } from 'material-ui/RadioButton'
// import RaisedButton from 'material-ui/RaisedButton'
// import {List, ListItem} from 'material-ui/List'
// import { TextField, RadioButtonGroup, Checkbox, SelectField, Slider, Toggle } from 'redux-form-material-ui'
import { SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'

// GENERIC REDUX FORM
import { GenericFormFields, GenericForm, gReduxForm, Validators } from 'generic-redux-form'
import { Multiple, GenericSlider, GenericToggle, MakeMultiple,
    SwitchMultiple,
    SwitchRFNB, RadioRFNB, CheckboxRFNB, MakeMultipleRFNB } from 'generic-redux-form/GenericComponentsNativeBase'

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

const TextField = Input // TODO: InputGroup

const genericFormFields = new GenericFormFields('login', {
  FormButtons:{
    component: (props) => <Button>{props.label}</Button>,
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
  gender:{
    type: 'radio',
    label: 'gender',
    labelPosition: 'right',
    labels: ['A','B', 'C', 'D'],
    validator: Validators.noValidation,
    component: (MakeMultiple(List, SwitchMultiple)), // TODO: WrappedSwitch
    defaultValue: [true, false, true, false], // TODO: Should take only last as active with radiobuttonStateBehavior()
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
  //   type: 'radio',
  //   label: 'Published',
  //   labelPosition: 'right',
  //   validator: Validators.noValidation,
  //   component: MakeMultipleRFNB(MakeMultiple(SwitchRFNB)),
  //   defaultValue: false,
  // },
  // settings:{
  //   type: 'toggle',
  //   label: 'settings',
  //   labels: ['PRICE OPTIMIZATION','TIME OPTIMIZATION', 'QUALITY OPTIMIZATION'],
  //   labelPosition: 'right',
  //   validator: Validators.noValidation,
  //   component: MultipleRFNB, //GenericToggle,
  //   defaultValue: [false, false, false],
  // },
  // category:{
  //   type: 'dropdown',
  //   label: 'category',
  //   validator: Validators.noValidation,
  //   component: (props) => <SelectField {...props}>
  //     <MenuItem value="Immobilier" primaryText="Immobilier"/>
  //     <MenuItem value="Auto" primaryText="Auto"/>
  //     <MenuItem value="Voyage" primaryText="Voyage"/>
  //   </SelectField>,
  //   defaultValue: "Voyage",
  // },
  // options:{
  //   type: 'checkbox',
  //   label: 'options',
  //   labelPosition: 'left',
  //   labels: ['travel','real estate', 'automotive'],
  //   validator: Validators.noValidation,
  //   component: MultipleRFNB,
  //   defaultValue: true,
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
          {/* <RadioRFNB label="todo" checked={true} onChange={() => console.log('clicked')}/> */}
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
