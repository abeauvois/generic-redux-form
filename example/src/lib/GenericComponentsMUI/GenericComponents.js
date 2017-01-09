
import React, { Component } from 'react'
import { Field } from 'redux-form'
// UI VENDORS
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'
import {Slider, Toggle} from 'redux-form-material-ui'

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
        defaultToggled: defaultValue
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
  Multiple, GenericSlider, GenericToggle
}
