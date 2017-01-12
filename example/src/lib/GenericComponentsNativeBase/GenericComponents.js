
import React, { Component, createElement } from 'react'
import { View } from 'react-native'
import { Field } from 'redux-form'
import Dropzone from 'react-dropzone'

// UI VENDORS
import { List, ListItem, Avatar, Switch, CheckBox,
  InputGroup, Input, Row, Text, Radio, Icon } from 'native-base'
// import Avatar from 'material-ui/Avatar'
// import {List, ListItem} from 'material-ui/List'
// import {Slider, Toggle} from 'redux-form-material-ui'
import { OSTheme } from 'native-base'

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
// TODO: Create a class component based on NativeBaseComponent
// for getting access to Theme via this.getTheme()
const WrappedCheckbox = (props) =>
  <ListItem onClick={props.onChange} >
    <Text>{props.label}</Text>
    <CheckBox checked={props.checked}/>
  </ListItem>
const WrappedPicker = (props) =>
  <Picker
    selectedValue={value}
    onValueChange={(itemValue) => onChange(itemValue)}
    {...props}>
  </Picker>
const WrappedSwitch = (props) =>
  <View style={{
    borderBottomWidth: 1,
    marginLeft: 15,
    padding: 10,
    paddingLeft: 2,
    justifyContent: 'space-between', //: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd'

  }}>
    <Text>{props.label}</Text>
    <Switch value={props.value} onValueChange={props.onChange}/>
  </View>
const WrappedRadio = (props) =>
  <ListItem onClick={props.onChange} >
    <Radio selected={props.selected}/>
    <Text>{props.label}</Text>
  </ListItem>
const WrappedTextinput = (props) =>
  <InputGroup style={{marginLeft: 15, paddingLeft: 0}}>
    <Icon style={{padding: 0}}
      name='ios-home'/>
    <Input
      onChangeText={props.onChange} placeholder={props.placeholder}/>
  </InputGroup>
const WrappedButton = (props) =>
  <Button onClick={props.onclick}>{props.label}</Button>
const WrappedFileinput = (props) =>
  <Dropzone onDrop={props.onDrop}>
    <Text>Try dropping files here, or click to select'em.</Text>
  </Dropzone>

function mapRFtoNB(Component){ // map ReduxForm to NativeBase props
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

const CheckboxRFNB = mapRFtoNB(WrappedCheckbox)
const PickerRFNB = mapRFtoNB(WrappedPicker)
const SwitchRFNB = mapRFtoNB(WrappedSwitch)
const RadioRFNB = mapRFtoNB(WrappedRadio)
const TextinputRFNB = mapRFtoNB(WrappedTextinput)
const ButtonRFNB = mapRFtoNB(WrappedButton)
const FileinputRFNB = mapRFtoNB(WrappedFileinput)

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
      onDrop: (files) => {
        console.log('files uploaded', files)
        onChange(files.join(','))
      },
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
  TextinputRFNB, ButtonRFNB, PickerRFNB, FileinputRFNB,
  SwitchRFNB, RadioRFNB, CheckboxRFNB, MakeMultipleRFNB
}
