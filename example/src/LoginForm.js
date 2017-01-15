import injectTouchTapEvent from 'react-tap-event-plugin'
injectTouchTapEvent() // Necessary for material-ui lib
// UI VENDORS
import React, { Component } from 'react'
import { View } from 'react-native'
import { CheckBox, List, ListItem, Card, CardItem, Row, Title,
  Text, Input, Radio, Slider, Switch, Button } from 'native-base'
// import { SelectField } from 'redux-form-material-ui'
// import MenuItem from 'material-ui/MenuItem'

// GENERIC REDUX FORM
import { GenericFormFields, GenericForm, gReduxForm, Validators } from 'generic-redux-form'
import { default as Gen } from './GenericComponentsNativeBase'

const CardHeader = (props) => {
  return (
    <CardItem>
      <Text>{props.title}</Text>
      <Text note>{props.subtitle}</Text>
    </CardItem>
)}
const CardTitle = Title
const CardText = CardItem

const genericFormFields = new GenericFormFields('login', {
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
  // gender:{
  //   type: 'radio',
  //   label: 'gender',
  //   labelPosition: 'right',
  //   labels: ['A','B', 'C'],
  //   validator: Validators.noValidation,
  //   component: MakeMultiple(List, SwitchMultiple), // TODO: WrappedSwitch
  //   defaultValue: [false, false, true], // TODO: Should take only last as active with radiobuttonStateBehavior()
  // },
  // criterions:{
  //   type: 'slider',
  //   label: 'criterions',
  //   labels: ['value','effort', 'risk'],
  //   validator: Validators.noValidation,
  //   component: GenericSlider,
  //   limits: {min: 0, max: 50, step: 1},
  //   defaultValue: 0,
  // },
  upload:{
    type: 'textinput',
    label: 'upload',
    labelPosition: 'right',
    validator: Validators.noValidation,
    component: Gen.FileinputRFNB,
    placeholder: 'your name',
    defaultValue: '',
  },
  username:{
    type: 'textinput',
    label: 'username',
    labelPosition: 'right',
    validator: Validators.noValidation,
    component: Gen.TextinputRFNB,
    placeholder: 'your name',
    defaultValue: '',
  },
  check1:{
    type: 'checkbox',
    label: 'check1',
    labelPosition: 'right',
    validator: Validators.noValidation,
    component: Gen.CheckboxRFNB,
    defaultValue: true,
  },
  check2:{
    type: 'checkbox',
    label: 'check2',
    labelPosition: 'right',
    validator: Validators.noValidation,
    component: Gen.CheckboxRFNB,
    defaultValue: false,
  },
  published:{
    type: 'switch',
    label: 'published',
    labelPosition: 'right',
    validator: Validators.noValidation,
    component: Gen.SwitchRFNB,
    defaultValue: true,
  },
  sectionA: {
    type: 'section',
    label: 'sectionA',
    inputs: {
      sent:{
        type: 'radio',
        label: 'sent',
        labelPosition: 'right',
        validator: Validators.noValidation,
        component: Gen.RadioRFNB,
        defaultValue: false,
      },
      test:{
        type: 'radio',
        label: 'test',
        labelPosition: 'right',
        validator: Validators.noValidation,
        component: Gen.RadioRFNB,
        defaultValue: false,
      },
      test2:{
        type: 'radio',
        label: 'test2',
        labelPosition: 'right',
        validator: Validators.noValidation,
        component: Gen.RadioRFNB,
        defaultValue: false,
      },
    }
  },
  sectionB: {
    type: 'section',
    label: 'sectionB',
    inputs: {
      check1:{
        type: 'checkbox',
        label: 'check1',
        labelPosition: 'right',
        validator: Validators.noValidation,
        component: Gen.CheckboxRFNB,
        defaultValue: true,
      },
      check2:{
        type: 'checkbox',
        label: 'check2',
        labelPosition: 'right',
        validator: Validators.noValidation,
        component: Gen.CheckboxRFNB,
        defaultValue: false,
      }
    },
  },
  // validCancel:{
  //   type: 'FormButtons',
  //   label: 'validCancel',
  //   component: Gen.Button,
  // }
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
  }
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
  }
}

export default gReduxForm(genericFormFields)(LoginForm)
