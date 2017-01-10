
import React, { Component, createElement } from 'react'
import { Field } from 'redux-form'

// UI VENDORS
import { List, ListItem, Avatar, Switch, CheckBox, Row, Text, Radio } from 'native-base'
// import Avatar from 'material-ui/Avatar'
// import {List, ListItem} from 'material-ui/List'
// import {Slider, Toggle} from 'redux-form-material-ui'

// WRAPPING Native-Base-Web component for better layout and event handling
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
  <ListItem onClick={props.onChange} >
    <Radio selected={props.value}/>
    <Text>{props.label}</Text>
  </ListItem>

function MakeMultiple(ListWrapper, WrappedComponent){
  return function createMultiple(config) {
    const isMultiple = l => l && l.length && (l.length > 0)
    return class Multiple extends Component {
      constructor(props){
        super(props)
        this.state = {
          ...config.defaultValue
        }
        this.onChange = this .onChange.bind(this)
      }
      onChange(value){
        this.setState({value})
      }
      render(){
        const { label, labels } = config
        if (isMultiple(labels)){
          return (
            <ListWrapper>
              {
                labels.map(label => <WrappedComponent key={label} label={label} wrappedValue={this.state[label]} onWrappedChange={this.onChange}/>)
              }
            </ListWrapper>
          )
        } else {
          return <WrappedComponent key={label} label={label} wrappedValue={this.state[label]} onWrappedChange={this.onChange}/>
        }
      }
    }
  }
}
// function MakeList(WappedComponent, config) {
//   return MakeMultiple(List, WappedComponent, config)
// }

// class Multiple extends Component {
//     constructor(props){
//       super(props)
//       // this.state = {
//       //   value: {}
//       // }
//       // this.onChangeHandler = this.onChangeHandler.bind(this)
//     }
//     // onChangeHandler(values){
//     //   console.log('changed!', values)
//     //   // this.setState({ values })
//     // }
//     // componentDidMount(){
//     //   // const values = {}
//     //   // this.props.labels.map(label => values[label] = this.props.defaultValue)
//     //   // this.onChangeHandler(values)
//     // }
//     // componentWillReceiveProps(nextProps, nextState){
//     //
//     // }
//     render(){
//       // Form GenericFormField config
//       const {type, label, labels, labelPosition, component, description, placeholder, defaultValue,
//       limits, onChange, validator, touched, error, ref, withRef} = this.props.config
//       let attribs = {
//         validate: validator,
//         defaultValue,
//         ref,
//         withRef
//       }
//       let WrappedComponent
//       switch (type) {
//         // case 'slider':
//         //   if (!limits) {
//         //     throw new Error('GenericForm Slider requires "limits" prop, check your GenericFormFields data.')
//         //   }
//         //   attribs = {
//         //     ...attribs,
//         //     style: {overflow: 'visible'},
//         //     description,
//         //     format: null,
//         //     min: limits.min,
//         //     max: limits.max,
//         //     step: limits.step,
//         //     onChange
//         //   }
//         //   break
//         // case 'toggle':
//         //   if (!labelPosition) {
//         //     throw new Error('GenericToogle requires labelPosition prop, check your GenericFormFields data.')
//         //   }
//         //   attribs = {
//         //     ...attribs,
//         //     component: WrappedToggle
//         //     style: {overflow: 'visible'},
//         //     labelPosition,
//         //     defaultValue: defaultValue
//         //   }
//         //   break
//         case 'checkbox':
//         case 'radio':
//           if (!labelPosition) {
//             throw new Error('GenericCheckBox requires labelPosition prop, check your GenericFormFields data.')
//           }
//           attribs = {
//             ...attribs,
//             style: {overflow: 'visible'},
//             labelPosition,
//             defaultValue: defaultValue
//           }
//           WrappedComponent = (type === 'radio') ? WrappedRadio : WrappedCheckbox
//           break
//         default:
//           WrappedComponent = WrappedRadio
//       }
//       debugger
//       if (this.props.labels && this.props.labels.length > 0){
//         return (
//           <List>
//             {
//               this.props.labels.map(label => {
//                 debugger
//                 // this.setState((prevState, props) => {
//                 //   values: 0
//                 // })
//                 return (
//                   <WrappedComponent {...attribs}
//                     key={label}
//                     name={label}
//                     label={label}
//                   />)
//               })
//             }
//           </List>
//         )
//       } else {
//         return <Field {...attribs} name={label} label={label}/>
//       }
//     }
//   }
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
      value: !!value ? true : false,
      // onClick ? OnChange ? onPress ?
      onChange: () => onChange(!value)
    })
  )

  // const MakeMultipleRFNB = Multiple => {debugger}
  function MakeMultipleRFNB(Multiple) {
    return createComponent(
    Multiple,
    ({ // from Redux-Form component
      // onWrappedChange,
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
      // onClick ? OnChange ? onPress ?
      onChange: (e) => onChange(value) //onChange(onWrappedChange(value))
    })
  )}

  // const MakeMultipleCheckBoxRFNB = MakeMultipleRFNB(MakeMultiple(List, CheckBoxRFNB, config))

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
  WrappedCheckbox, WrappedSwitch, WrappedRadio, MakeMultipleRFNB
}
