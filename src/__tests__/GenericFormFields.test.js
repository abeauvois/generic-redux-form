import { GenericFormFields, Constants, Validators } from '../index.js'

describe('GenericFormFields init', ()=> {
    const data = {
      email:{
        type: 'input',
        label: 'email',
        validator: Validators.email,
        iconName: 'ios-person',
        defaultValue: 'my@email.com'
      },
      password:{
        type: 'input',
        label: 'password',
        validator: Validators.required,
        iconName: 'ios-lock',
        placeholder: 'PASSWORD',
        defaultValue: 'test',
      }
    }
    const configFormFields = new GenericFormFields('login', data)
  // const names = configFormFields.getFieldsListKeys()
  it('Contains formName after getFormName()', () => {
    expect(configFormFields.getFormName()).toBe('login')
  })
  it('Contains fields keys after getFieldsListKeys()', () => {
    expect(configFormFields.getFieldsListKeys()).toEqual(['email', 'password'])
  })
  it('Contains default fields values after getDefaultValues()', () => {
    const values = configFormFields.getDefaultValues()
    expect(values.email).toBe(data.email.defaultValue)
    expect(values.password).toBe(data.password.defaultValue)
  })
  it('Contains errors after validate({email: "example@dot.com"})', () => {
    const errors = configFormFields.validate({email: 'example@dot.com'})
    expect(errors.email).toBeFalsy()
    expect(errors.password).toBe(Constants.ERROR_REQUIRED)
  })
  it('Contains errors after validate({email: "example@", password: "toto"})', () => {
    const errors = configFormFields.validate({email: "example@", password: "toto"})
    expect(errors.email).toBe(Constants.ERROR_INVALID_EMAIL)
    expect(errors.password).toBeFalsy()
  })
})
