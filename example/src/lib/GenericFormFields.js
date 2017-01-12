// @flow

// FLOW TYPES
type Field = {
  type: string,
  label: string,
  labelPosition: string,
  iconType: string,
  iconLeftName?: string,
  iconRightName?: string,
  iconRightSize?: number,
  placeholder?: string,
  limits?: {min: number, max: number, step: number},
  defaultValue?: string,
  selectData?: Array<string>,
  style?: Object,
}
type FieldsList = {[key: string]: Field}
type FieldsListKeys = Array<string>

const Constants = {
  ERROR: 'ERROR',
  ERROR_REQUIRED: '* Required',
  ERROR_INVALID_EMAIL: 'Invalid Email',
}

const Validators = {
  noValidation: value => undefined,
  required: value => !value ? Constants.ERROR_REQUIRED : undefined,
  email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? Constants.ERROR_INVALID_EMAIL : undefined
}

class GenericFormFields {
  formName: string
  fieldsList: FieldsList
  fieldsListKeys: FieldsListKeys

  constructor(formName: string, fieldsList: FieldsList){
    this.formName = formName
    this._setFields(fieldsList)
  }
  _setFields(fieldsList: FieldsList){
    this.fieldsList = fieldsList || this.fieldsList
    this.fieldsListKeys = Object.keys(this.fieldsList)
    return this.fieldsListKeys
  }
  getFormName(){
    return this.formName
  }
  getFieldsListKeys(){
    return this.fieldsListKeys
  }
  getDefaultValues(){
    let formDefaultValues = {}
    this.fieldsListKeys.forEach(k => {
      const fieldConfig = this.fieldsList[k]
      if (!fieldConfig.defaultValue && fieldConfig.type ==='section') {
        const defaultValues = []
        const inputsKeys = Object.keys(fieldConfig.inputs)
        inputsKeys.forEach(input => defaultValues.push(fieldConfig.inputs[input].defaultValue))
        formDefaultValues[k] = defaultValues
      } else {
        formDefaultValues[k] = fieldConfig.defaultValue
      }
    })
    return formDefaultValues
  }
  validate(values: any = {}){
    const errors = {}
    this.fieldsListKeys.forEach(k => {
      errors[k] = this.fieldsList[k].validator(values[k])
    })
    return errors
  }
}
export {
  Constants,
  Validators
}
export default GenericFormFields
