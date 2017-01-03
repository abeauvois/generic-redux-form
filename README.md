[![NPM version](https://badge.fury.io/js/generic-redux-form.svg)](https://badge.fury.io/js/generic-redux-form)
[![LambCI Build Status](https://lambci-buildresults-11jwp0b3nz7l5.s3.amazonaws.com/gh/abeauvois/generic-redux-form/branches/master/5a466530172a1c4dc7b28f77b3e2b2be.svg)](https://lambci-buildresults-11jwp0b3nz7l5.s3.amazonaws.com/gh/abeauvois/generic-redux-form/branches/master/894687ca78df1a3be8f97812c723f645.html)

`generic-redux-form` is under active development. APIs will change and things may still not work as expected. If you find
  any issue, please [report it](https://github.com/abeauvois/generic-redux-form/issues). We'll do our best to fix it.

# GenericReduxForm

A Javascript library for making forms a breeze with JSON configurable file + Redux-Form

## Demo
https://abeauvois.github.io/generic-redux-form

## Usage
```
# install generic-redux-form
npm install generic-redux-form

# install with yarn
yarn add generic-redux-form

# run the tests
cd node_modules/generic-redux-form
npm test

# run the example
cd node_modules/generic-redux-form
npm install OR yarn

then

npm start

then open your browser and go to http://localhost:3030
```

Here is the code for a simple form with redux-form (without Generic Redux Form):

```js
import React from 'react'
import { TextField } from 'redux-form-material-ui'
import { Field, reduxForm } from 'redux-form'

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="name"
          component={TextField}
          hintText="Name"
          floatingLabelText="Name"
          validate={required}
          ref="name" withRef/>
      </div>
      <div>
        <Field name="email"
          component={TextField}
          hintText="Email"
          floatingLabelText="Email"
          validate={[ required, email ]}/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm)
```

You get the same result with the following code:

```js
import React from 'react'
import { TextField } from 'redux-form-material-ui'
import { GenericFormFields, GenericForm, gReduxForm, Validators } from 'generic-redux-form'

const genericFormFields = new GenericFormFields('login', {
      email:{
        type: 'input',
        label: 'email',
        validator: Validators.email,
        component: TextField,
        placeholder: 'EMAIL',
        default: 'my@email.com',
      },
      password:{
        type: 'input',
        label: 'password',
        validator: Validators.required,
        component: TextField,
        placeholder: 'PASSWORD',
        default: 'test',
    }
  })


class SimpleForm extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
        <div>
          <GenericForm {...this.props}/>
        </div>
    )
  }
}

export default gReduxForm(genericFormFields)(SimpleForm)
```

## Contribute
See the contributing docs.

## Changelog
See the [release page](https://github.com/abeauvois/generic-redux-form/releases)


License
---
`generic-redux-form` is [MIT](https://github.com/abeauvois/generic-redux-form/blob/master/LICENSE) licensed.
