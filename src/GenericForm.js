// @flow
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class GenericForm extends Component {
  constructor(props, context){
    super(props)
    if (!context._reduxForm) {
      throw new Error('GenericForm must be inside a component decorated with gReduxForm()')
    }
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
    const genericFormFields = this.props.genericFormFields
    const field = genericFormFields.fieldsList[k]
    const {type, label, component, placeholder, validator, touched, error} = field
    return (
      <Field
        key={k}
        name={label}
        component={component}
        hintText={placeholder}
        floatingLabelText={label}
        validate={validator}
        ref={label} withRef/>
    )
  }
  render(){
    if (!genericFormFields) return null
    const {genericFormFields, handleSubmit, pristine, submitting } = this.props
    const names = genericFormFields.fieldsListKeys

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        {
          names.map(k => {
            const field = genericFormFields.fieldsList[k]
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
//   let formValues = genericFormFields.getDefaultValues()
//   return {
//     fieldsNames: genericFormFields.getFieldsListKeys(),
//     validate: genericFormFields.validate.bind(genericFormFields),
//     initialValues: formValues || genericFormFields.getDefaultValues(),
//   }
// }

const gReduxForm = genericFormFields => WrappedComponent => reduxForm({
    form: genericFormFields.getFormName(),
    genericFormFields: genericFormFields,
    enableReinitialize: true,
    initialValues: genericFormFields.getDefaultValues(),
  })(WrappedComponent)

export {
  GenericForm,
  gReduxForm
}
