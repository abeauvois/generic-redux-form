
// UI VENDORS
import React, { Component, createElement } from 'react'
import { View } from 'react-native'
import { CheckBox, List, ListItem, Card, CardItem, Row, Title,Text, Input, Radio, Slider, Switch, Button } from 'native-base'
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
const Checkbox = (props) =>
  <ListItem onClick={props.onChange} >
    <Text>{props.label}</Text>
    <CheckBox checked={props.checked}/>
  </ListItem>
// const SelectField = Picker
// const Item = Picker.Item
// const MenuItem = (props) => <Picker.Item label={props.label} value={props.primaryText}/>
const Toggle = (props) =>
  <Row>
    <Text>{props.label}</Text>
    <Switch value={props.value} onValueChange={props.onValueChange}/>
  </Row>

const RaisedButton = (props) =>
  <Button>
    {props.label}
  </Button>

/**
 * Creates a component class that renders the given Native Base component
 * Inspired by erikras/redux-form-material-ui
 * @param NativeBaseComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Native Base
 * component needs
 */
function createComponent(NativeBaseComponent, mapProps) {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.refs.component
    }
    render() {
      return createElement(NativeBaseComponent, {
        ...mapProps(this.props),
        ref: 'component'
      })
    }
  }
  InputComponent.displayName = `ReduxFormNativeBase${NativeBaseComponent.name}`
  return InputComponent
}

// import CheckBox from 'native-base/Components/Widgets/CheckBox'

const CheckBoxRNRFNB = createComponent(
  Checkbox,
  ({
    input: {
      onChange,
      value,
      ...inputProps
    },
    meta,
    ...props
  }) => ({
    ...inputProps,
    ...props,
    checked: !!value ? true : false,
    // onClick ? OnChange ? onPress ?
    onChange: () => onChange(!value)
  })
)
const SwitchRNRFNB = createComponent(
  Toggle,
  ({
    input: {
      onChange,
      value,
      ...inputProps
    },
    meta,
    ...props
  }) => ({
    ...inputProps,
    ...props,
    value: !!value ? true : false,
    // onClick ? OnChange ? onPress ?
    onValueChange: () => onChange(!value)
  })
)

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
    component: SwitchRNRFNB, //GenericToggle,
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
    labelPosition: 'left',
    labels: ['travel','real estate', 'automotive'],
    validator: Validators.noValidation,
    component: CheckBoxRNRFNB,
    defaultValue: true,
  },
})

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: "key0",
      switch: true,
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
            {/* <Checkbox label="todo" checked={true} onChange={() => console.log('clicked')}/> */}

            {/* <SwitchRNRFNB value={this.state.switch} onValueChange={()=>this.setState({switch: !this.state.switch})}/> */}
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
