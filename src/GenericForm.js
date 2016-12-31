// @flow
import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

class GenericForm extends Component {
  static contextTypes = {
    _reduxForm: PropTypes.object
  }
  constructor(props, context){
    super(props)
    if (!context._reduxForm) {
      throw new Error('GenericForm must be inside a component decorated with gReduxForm()')
    }
    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
  }
  componentDidMount() {
    this.refs.firstField            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }
  submit(){
    console.log('submitted')
  }
  reset(){
    console.log('reset')
  }

  render(){
    if (!this.props.genericFormFields) return null
    const {genericFormFields, handleSubmit, pristine, submitting } = this.props
    const names = genericFormFields.fieldsListKeys
    const FormButtons = genericFormFields.fieldsList['FormButtons'].component
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        {
          names.map(k => {
            const field = genericFormFields.fieldsList[k]
            const {type, label, labels, component, description, placeholder, defaultValue,
            limits, onChange, validator, touched, error, ref, withRef} = field

            switch (type) {
              // case 'image':
              //   return renderFormImage(k)
              // case 'avatar':
              //   return this.renderFormAvatar(k)
              case 'slider':
                if (!limits) {
                  throw new Error('GenericForm Slider requires "limits" prop, check your GenericFormFields data.')
                }
                return (
                  <Field key={k} name={label} component={component}
                    validate={validator} defaultValue={defaultValue}
                    description={description}
                    format={null}
                    min={limits.min}
                    max={limits.max}
                    step={limits.step}
                    onChange={onChange}
                    ref={ref} withRef={withRef}/>
                )
              case 'checkbox':
                if (labels && labels.length > 0){
                  return (
                    <div key={k}>
                      {
                        labels.map(label =>
                          <Field key={label} name={label} component={component}
                            label={label}
                            onCheck={value => console.log('onCheck '+label, value )}
                          />
                        )
                      }
                    </div>
                  )
                } else {
                  return (
                    <Field key={k} name={label} component={component}
                      label={label}
                      onCheck={value => console.log('onCheck ', value )}
                    />
                  )
                }
              case 'radiobutton':
                return (
                  <Field key={k} name={label} component={component}
                    ref={ref} withRef={withRef}>
                  </Field>
                )
                // case 'switch':
                //   return renderFormSwitch(k)
              case 'dropdown':
                console.log('dropdown')
                // return (
                //   <Field key={k} name={label} component={component}>
                //     <MenuItem value="Immobilier" primaryText="Immobilier"/>
                //     <MenuItem value="Auto" primaryText="Auto"/>
                //     <MenuItem value="Voyage" primaryText="Voyage"/>
                //   </Field>
                // )
                return (
                  <Field key={k} name={label} component={component}
                    validate={validator}
                    hintText={label}
                    floatingLabelText={label}
                    ref={ref} withRef={withRef}>
                  </Field>
                )
              default:
                if (k === 'FormButtons') return null
                console.log('input')
                return (
                  <Field key={k} name={label} component={component}
                    validate={validator}
                    hintText={placeholder}
                    floatingLabelText={label}
                    ref={ref} withRef={withRef}/>
                )}
          })
        }
        <div>
          <FormButtons primary type="submit" label="Submit" disabled={submitting} />
          <FormButtons secondary label="Cancel" disabled={pristine || submitting} onClick={this.reset}/>
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
