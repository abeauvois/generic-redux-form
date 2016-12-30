import React, { Component } from 'react'

import { Container, Content, Card, CardItem, Button, Icon, List,
  ListItem, InputGroup, Input, Picker, Text, Switch } from 'native-base'

const Item = Picker.Item

class FormDropdown extends Component {
  constructor(props) {
    super(props)
    this.onValueChange = this.onValueChange.bind(this)
  }
  componentWillReceiveProps(nextProps){
    const newValue = nextProps.fields[nextProps.fieldName].input.value
    this.onValueChange(newValue)
  }
  onValueChange(value){
    const k = this.props.fieldName
    this.props.fields[k].input.onChange(value)
  }
  render() {
    const k = this.props.fieldName
    const field = this.props.fields.configFormFields.fieldsList[k]
    const {label, iconName, selectData, touched, error} = field
    return (
      <ListItem key={k}>
        <Icon name={error && 'times-circle' || iconName || 'ios-play'}
          style={{fontSize: 27, marginLeft: 5, marginTop: 3}}/>
        <Picker
          style={{left: 12, width: Dimensions.get('window').width, alignSelf: 'flex-start', justifyContent: 'flex-start'}}
          selectedValue={this.props.fields[k].input.value || selectData[0]}
          onValueChange={this.onValueChange}>
          {
            selectData.map(d => <Item key={d} label={d} value={d} />)
          }
        </Picker>
        <Icon name="md-arrow-dropdown" style={{fontSize: 36, marginTop: 3}}/>
      </ListItem>
    )
  }
}
