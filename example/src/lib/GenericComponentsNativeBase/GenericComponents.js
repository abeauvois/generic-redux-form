
import React, { Component, createElement } from 'react'
import { Field } from 'redux-form'

// UI VENDORS
import { List, ListItem, Avatar, Switch, CheckBox,
  InputGroup, Input, Row, Text, Radio, Icon } from 'native-base'
// import Avatar from 'material-ui/Avatar'
// import {List, ListItem} from 'material-ui/List'
// import {Slider, Toggle} from 'redux-form-material-ui'

const getDefaultValue = (labels, label, defaultValues) => {
  if (!labels) return defaultValues // Case of not Multiple
  return defaultValues.find((dv, i) => labels[i] === label )
}

const Multiply = (props) => {
  const {labels, onChange, defaultValue, values, ListWrapper, WrappedComponent} = props
  return (
    <ListWrapper>
      {
        labels.map(label => {
          return (
            <WrappedComponent
              key={label}
              name={label}
              onComponentChange={onChange} // Available for createComponent() later..
              defaultValue={getDefaultValue(labels, label, defaultValue)} // value prop for WrappedComponent, not for Field
              value={values[label]}
            />
          )}
        )
      }
    </ListWrapper>
  )}

function MakeMultiple(ListWrapper, WrappedComponent){
  return function createMultiple(config) {
    const isMultiple = l => l && l.length && (l.length > 0)
    return class Multiple extends Component {
      constructor(props){
        super(props)
        this.state = {
          values: this.initState(props.label, props.labels, props.defaultValue)
        }
        this.onChange = this .onChange.bind(this)
      }
      // componentDidMount(){
      //   // this.initState(config.labels, config.defaultValue)
      // }
      // componentWillUpdate(nextProps, nextState){
      // }
      initState(label, labels, initialValues){
        const initialState = {}
        if (!labels) return {[label]: initialValues}
        labels.forEach((label, index) => initialState[labels[index]] = initialValues[index])
        return initialState
      }
      radiobuttonStateBehavior(config, lastSelected){
        const { label, labels } = config
        const resetedState = {}
        if (!labels){
          resetedState[lastSelected.name] = lastSelected.value
        } else {
          labels.forEach(label => resetedState[label] = false)
          resetedState[lastSelected.name] = true
        }
        return {...resetedState}
      }
      independantStateBehavior(lastSelected){
        return {...lastSelected}
      }
      onChange(lastSelected){
        let s
        switch (config.type) {
          case 'radio':
            s = this.radiobuttonStateBehavior(config, lastSelected)
            break
          default:
            s = this.independantStateBehavior({[lastSelected.name]: lastSelected.value})
        }
        this.setState({values: s})//.then(console.log)
        if (this.props.onChange) this.props.onChange(s)
      }
      render(){
        const { label, labels, defaultValue } = config
        if (isMultiple(labels)){
          // return (
          //   <Field
          //     key={label}
          //     name={label}
          //     component={Multiply}
          //     WrappedComponent={WrappedComponent}
          //     ListWrapper={ListWrapper}
          //     onChange={this.onChange} // Available for createComponent() later..
          //     defaultValue={defaultValue} // value prop for WrappedComponent, not for Field
          //     labels={labels}
          //     values={this.state.values}
          //   />
          // )
          return (
            <Multiply
              WrappedComponent={WrappedComponent}
              name={label}
              labels={labels}
              ListWrapper={ListWrapper}
              onChange={this.onChange} // Available for createComponent() later..
              defaultValue={defaultValue} // value prop for WrappedComponent, not for Field
              values={this.state.values}
            />
          )
        } else {
          return (
            <WrappedComponent
              key={label}
              name={label}
              component={WrappedComponent}
              onComponentChange={this.onChange}
              defaultValue={getDefaultValue(labels, label, defaultValue)} // value prop for WrappedComponent, not for Field
              value={this.state.values[label]}
            />
          )
        }
      }
    }
  }
}
// function MakeList(WappedComponent, config) {
//   return MakeMultiple(List, WappedComponent, config)
// }

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

// WRAPPING Native-Base-Web component for better layout and event handling
const WrappedCheckbox = (props) =>
  <ListItem onClick={props.onChange} >
    <Text>{props.label}</Text>
    <CheckBox checked={props.checked}/>
  </ListItem>
const WrappedSwitch = (props) =>
  <Row>
    <Text>{props.label}</Text>
    <Switch value={props.value} onValueChange={props.onChange}/>
  </Row>
const WrappedRadio = (props) =>
  <ListItem onClick={props.onChange} >
    <Radio selected={props.selected}/>
    <Text>{props.label}</Text>
  </ListItem>
const WrappedTextinput = (props) =>
  <InputGroup>
    <Icon name='ios-home' style={{color:'#384850'}}/>
    <Input onChangeText={props.onChange} placeholder={props.placeholder}/>
  </InputGroup>

function mapNBtoRF(Component){ // map NativeBase props to ReduxForm
  return createComponent(
    Component,
    // (r) => {debugger},
    ({
      inputType,
      defaultValue,
      input: {
        onChange,
        value,
        name,
        ...inputProps
      },
      meta,
      ...props
    }) => ({
      ...inputProps,
      ...props,
      label: name,
      checked: !!value ? true : false,
      value: !!value ? true : false,
      selected: !!value ? true : false,
      onChange: (newValue) => { // Becomes props.onChange in Component
        let result
        if (inputType === 'textinput') {
          result = newValue
        } else { // inputType: checkbox, switch, radio
          result = !value
        }
        // let valueVariable = (inputType === 'checked') ? 'checked' : (inputType === 'radio') ? 'selected' : 'value'
        // const r = valueVariable === 'checked' ? result : e
        // result[valueVariable]
        onChange(result) // Calls Field RF onChange() => Field input
      }
    })
  )
}

const CheckboxRFNB = mapNBtoRF(WrappedCheckbox)
const SwitchRFNB = mapNBtoRF(WrappedSwitch)
const RadioRFNB = mapNBtoRF(WrappedRadio)
const TextinputRFNB = mapNBtoRF(WrappedTextinput)

function toMultiple(Component){
  return createComponent(
    Component,
    // (r) => {debugger},
    ({
      onComponentChange, // Coming from <WrappedComponent onComponentChange={}/>
      inputType,
      defaultValue,
      name,
      value,
      ...props
    }) => ({
      ...props,
      label: name,
      checked: !!value ? true : false,
      value: !!value ? true : false,
      selected: !!value ? true : false,
      onChange: (e) => {
        let result
        // if (value === '') {
        //   result = defaultValue
        // }else {
          result = !value //{name, [valueVariable]: !!value ? false : true}
        // }
        // let valueVariable = (inputType === 'checked') ? 'checked' : (inputType === 'radio') ? 'selected' : 'value'
        // const r = valueVariable === 'checked' ? result : e
        // result[valueVariable]
        onChange(result)
      },
      onValueChange: () => {
        const result = {name, value: !value}
        onComponentChange && onComponentChange(result)
        // onChange(result.value)
        // debugger
        // onChange(newVal)
        // console.log('onComponentChange result', componentState)
        // const currentValue = componentState && componentState.values && componentState.values[name] || defaultValue
        // if (currentValue !== result.value){
        //   Object.keys(componentState.values).forEach(k => {
        //     const newValue = componentState.values[k]
            // onChange(result.value) // Only boolean for WrappedSwitch
        //   })
        // }
      }
    })
  )
}

function MakeMultipleRFNB(ListWrapper, WrappedComponent) {
  return function createMultipleRFNB(config) {
    const M = MakeMultiple(ListWrapper, WrappedComponent)(config)
    return createComponent(
      M,
      // (RF) => { debugger },
      ({ // from Redux-Form component
        input: {
          onChange,
          value,
          ...inputProps
        },
        meta,
        ...props
      }) => ({ // to Native-Base-Web component
        ...inputProps,
        ...props,
        value: value,
        onChange: (e) => {

          onChange(e[name]) // Call ReduxForm onChange()
        }//onChange(onWrappedChange(value))
      })
    )
  }
}

/**
 * TODO create separated Lib: redux-form-native-base
 */

const DEFAULT_LISTITEM_WIDTH = 220

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
  GenericSlider, GenericToggle, MakeMultiple,
  TextinputRFNB,
  SwitchRFNB, RadioRFNB, CheckboxRFNB, MakeMultipleRFNB
}
