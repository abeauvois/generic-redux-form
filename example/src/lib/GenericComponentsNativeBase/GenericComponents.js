
import React, { Component, createElement } from 'react'
import { Field } from 'redux-form'

// UI VENDORS
import { List, ListItem, Avatar, Switch, CheckBox, Row, Text, Radio } from 'native-base'
// import Avatar from 'material-ui/Avatar'
// import {List, ListItem} from 'material-ui/List'
// import {Slider, Toggle} from 'redux-form-material-ui'

const WrappedCheckbox = (props) =>
  <ListItem onClick={props.onChange} >
    <Text>{props.label}</Text>
    <CheckBox checked={props.checked}/>
  </ListItem>
const WrappedSwitch = (props) =>
  <Row>
    <Text>{props.label}</Text>
    <Switch value={props.value} onValueChange={props.onValueChange}/>
  </Row>
const WrappedRadio = (props) =>
  <Row>
    <Text>{props.label}</Text>
    <Radio selected={props.value} onChange={props.onChange}/>
  </Row>

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

  const CheckBoxRFNB = createComponent(
    WrappedCheckbox,
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
  const SwitchRFNB = createComponent(
    WrappedSwitch,
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
  const RadioRFNB = createComponent(
    WrappedRadio,
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
      selected: !!value ? true : false,
      // onClick ? OnChange ? onPress ?
      onPress: () => onChange(!value)
    })
  )

/**
 * TODO create separated Lib: redux-form-native-base
 */

const DEFAULT_LISTITEM_WIDTH = 220

const Multiple = (props) => {
  const {type, label, labels, labelPosition, component, description, placeholder, defaultValue,
  limits, onChange, validator, touched, error, ref, withRef} = props

  let attribs = {
    component,
    validate:validator,
    defaultValue,
    ref,
    withRef
  }
  switch (type) {
    case 'slider':
      if (!limits) {
        throw new Error('GenericForm Slider requires "limits" prop, check your GenericFormFields data.')
      }
      attribs = {
        ...attribs,
        style: {overflow: 'visible'},
        description,
        format: null,
        min: limits.min,
        max: limits.max,
        step: limits.step,
        onChange
      }
      break
    case 'toggle':
      if (!labelPosition) {
        throw new Error('GenericToogle requires labelPosition prop, check your GenericFormFields data.')
      }
      attribs = {
        ...attribs,
        style: {overflow: 'visible'},
        labelPosition,
        defaultValue: defaultValue
      }
      break
    case 'checkbox':
      if (!labelPosition) {
        throw new Error('GenericCheckBox requires labelPosition prop, check your GenericFormFields data.')
      }
      attribs = {
        ...attribs,
        style: {overflow: 'visible'},
        labelPosition,
        defaultValue: defaultValue
      }
      break
    default:
  }
  if (props.labels && props.labels.length > 0){
    return (
      <List>
        {
          props.labels.map(label => <Field {...attribs} name={label} key={label} label={label}/>)
        }
      </List>
    )
  } else {
    return <Field {...attribs} name={label} label={label}/>
  }
}
const GenericSlider = (props) => {
  return (
    <ListItem style={{width: props.width || DEFAULT_LISTITEM_WIDTH, paddingLeft: 60}}
      disabled
      primaryText={props.label.toUpperCase()}
      leftAvatar={
        <Avatar
          style={{left: 0}}
          color={'white'}
        >
          {props.input.value || 0}
        </Avatar>
      }
      secondaryText={<Slider sliderStyle={{marginTop: 0}} {...props}/>}
    >
    </ListItem>
  )
}
const GenericToggle = (props) => {
  return (
    <ListItem style={{width: 180, paddingLeft: 60}}
      disabled
      primaryText={props.label.toUpperCase()}
      leftAvatar={
        <Avatar
          style={{left: 0}}
          color={'white'}
        >
          {props.input.value ? 'YES' : 'NO'}
        </Avatar>
      }
      secondaryText={<Toggle style={{marginLeft: 0, overflow: 'visible'}} {...props} label=""/>}
    >
    </ListItem>
  )
}

export {
  Multiple, GenericSlider, GenericToggle,
  CheckBoxRFNB, SwitchRFNB, RadioRFNB
}
