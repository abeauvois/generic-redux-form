// @flow

// FLOW TYPES
type Field = {
  type: string,
  label: string,
  iconType: string,
  iconLeftName?: string,
  iconRightName?: string,
  iconRightSize?: number,
  placeholder?: string,
  default?: string,
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
      formDefaultValues[k] = this.fieldsList[k].default
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
