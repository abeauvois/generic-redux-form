// @flow
import injectTouchTapEvent from 'react-tap-event-plugin'
injectTouchTapEvent() // Necessary for material-ui lib
import React, { Component, PropTypes } from 'react'
import { Field, Form, reduxForm } from 'redux-form'

class GenericForm extends Component {
  static contextTypes = {
    _reduxForm: PropTypes.object
  }
  constructor(props, context){
    super(props)
    if (!context._reduxForm) {
      throw new Error('GenericForm must be inside a component decorated with gReduxForm()')
    }

    // this.state = {
    //   value: 1,
    // }
    //
    // this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
  }
  componentDidMount() {
    // this.refs.firstField            // the Field
    //   .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    //   .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    //   .focus()                // on TextField
  }
  // handleChange = (event, index, value) => this.setState({value})
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
    const FormButtons = genericFormFields.fieldsList['FormButtons'] && genericFormFields.fieldsList['FormButtons'].component

    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        {
          names.map(k => {
            const isMultiple = l => l && l.length && (l.length > 0) // OR component.name === 'createMultiple'
            const config = genericFormFields.fieldsList[k]
            const {type, label, labels, inputs, labelPosition, component, description, placeholder, defaultValue,
            limits, onChange, validator, touched, error, ref, withRef} = config
            // debugger
            switch (type) {
              // case 'image':
              //   return renderFormImage(k)
              // case 'avatar':
              //   return this.renderFormAvatar(k)
              case 'slider':
              case 'checkbox':
              case 'toggle':
              case 'radio':
                return (
                  <Field key={k} name={label}
                    component={component(config)}
                  />
                )
              case 'section':
                return (
                  <FormSection key={k} name={label}>
                    {
                      labels.map(label => {
                        return (
                          <Field
                            key={label}
                            name={label}
                            component={component}
                            onComponentChange={onChange} // Available for createComponent() later..
                          />
                        )}
                      )
                    }
                  </FormSection>
                )
              case 'dropdown':
                return (
                  <Field
                    key={k}
                    name={label}
                    component={component}
                    value={defaultValue}
                    validate={validator}
                    hintText={label}
                    floatingLabelText={label}
                    ref={ref} withRef={withRef}
                  />
                )
              default:
                if ((k === 'FormButtons') || (k === 'Multiple')) return null
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
      </Form>
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
