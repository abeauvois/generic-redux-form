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

const ERROR_REQUIRED = '* Required'

class ConfigFormFields {
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
      if (!values[k]) {
        if (this.fieldsList[k].required)
          errors[k] = ERROR_REQUIRED
      }
    })
    return errors
  }
}
export {
  ERROR_REQUIRED
}
export default ConfigFormFields
