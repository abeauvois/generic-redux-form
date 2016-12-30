// @flow
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
// import ImagePicker from 'react-native-image-picker'
// import {Icon, List, ListItem, InputGroup, Input, Text, Switch } from 'native-base'
// import FormDropdown from './form-dropdown.js'
import {
  // AutoComplete,
  // Checkbox,
  // DatePicker,
  // TimePicker,
  // RadioButtonGroup,
  // SelectField,
  // Slider,
  TextField,
  // Toggle
} from 'redux-form-material-ui'

class GenericForm extends Component {
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
  }
  submit(){
    console.log('submitted')
  }
  reset(){
    console.log('reset')
  }
  renderInput(k: string) {
    const configFormFields = this.props.configFormFields
    const field = configFormFields.fieldsList[k]
    const {type, label, iconName, placeholder, required, touched, error} = field
    // console.log(fields[k].input)
    return (
      <Field
        key={k}
        name={label}
        component={TextField}
        hintText={placeholder}
        floatingLabelText={label +' '+ (error ? error : '')}
        validate={() => required}
        ref={label} withRef/>
    )
  }
  // const renderFormImage = (k: string) => {
  //   function selectImage(onConfirmCallback) {
  //     const options = {
  //       title: 'Select Image',
  //       customButtons: [
  //         {name: 'fb', title: 'Choose Photo from Facebook'},
  //       ],
  //       storageOptions: {
  //         skipBackup: true,
  //         path: 'images'
  //       }
  //     }
  //     ImagePicker.showImagePicker(options, (response) => {
  //       console.log('ImagePicker response = ', response)
  //       if (response.didCancel) {
  //         console.log('User cancelled image picker')
  //       }
  //       else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error)
  //       }
  //       else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton)
  //       }
  //       else {
  //         const source = {uri: response.uri.replace('file://', ''), isStatic: true}
  //         fields[k].input.onChange(source.uri)
  //         if (typeof onConfirmCallback === 'function') onConfirmCallback(source)
  //       }
  //     })
  //   }
  //   const field = fields.configFormFields.fieldsList[k]
  //   const {type, label, iconName, touched, error} = field
  //   const currentUri = fields[k].input.value
  //   const source = (currentUri === '') ? DEFAULT_GRAAL_IMAGE : {uri: fields[k].input.value}
  //   console.log(fields[k].input, source)
  //   return (
  //     <ListItem key={k} button onPress={selectImage}>
  //       <Image resizeMode="cover" source={source} style={localStyle.image}>
  //         <View style={localStyle.imageButton}>
  //           <Icon style={{backgroundColor:'transparent'}}
  //             name={error && 'times-circle' || iconName || 'md-camera'}/>
  //           <Text style={{backgroundColor:'transparent'}}>
  //             {label}
  //           </Text>
  //         </View>
  //       </Image>
  //     </ListItem>
  //   )
  // }
  // const renderFormDropdown = (k: string) => {
  //   return (
  //     <FormDropdown key={k} fieldName={k} fields={fields}/>
  //   )
  // }
  // const renderFormSwitch = (k: string) => {
  //   const field = fields.configFormFields.fieldsList[k]
  //   const {label, selectData, iconName, touched, error} = field
  //   const onSwitch = x => fields[k].input.onChange(x)
  //   const switchValue = fields[k].input.value==="" ? false : fields[k].input.value
  //   return (
  //     <ListItem key={k} iconLeft>
  //       <Icon name={error && 'times-circle' || iconName || 'ios-play'}
  //         style={{fontSize: 27, marginLeft: 5, marginTop: 5}}/>
  //       <Text style={{marginLeft: 13, alignSelf: 'center'}}>
  //         {label}: {switchValue ? 'YES' : 'NO'}
  //       </Text>
  //       <Switch
  //         value={switchValue}
  //         onValueChange={onSwitch}
  //       />
  //     </ListItem>
  //   )
  // }
  render(){
    const {configFormFields, handleSubmit, pristine, submitting } = this.props
    const names = configFormFields.fieldsListKeys

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        {
          names.map(k => {
            const field = configFormFields.fieldsList[k]
            const type = field.type
            switch (type) {
              // case 'image':
              //   return renderFormImage(k)
              // case 'avatar':
              //   return this.renderFormAvatar(k)
              // case 'switch':
              //   return renderFormSwitch(k)
              // case 'dropdown':
              //   return renderFormDropdown(k)
              default:
                return this.renderInput(k)
            }
          })
        }
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={this.reset}>Clear</button>
        </div>
      </form>
    )
  }
}

// function mapStateToProps(state, ownProps){
//   let formValues = configFormFields.getDefaultValues()
//   return {
//     fieldsNames: configFormFields.getFieldsListKeys(),
//     validate: configFormFields.validate.bind(configFormFields),
//     initialValues: formValues || configFormFields.getDefaultValues(),
//   }
// }

const gReduxForm = configFormFields => WrappedComponent => reduxForm({
    form: configFormFields.getFormName(),
    configFormFields: configFormFields,
    enableReinitialize: true,
    initialValues: configFormFields.getDefaultValues(),
  })(WrappedComponent)

export {
  GenericForm,
  gReduxForm
}
