# GenericReduxForm

Create redux forms in a few lines of code and spend much less maintenance time on them.


## Example

Here is the code for a simple form with redux-form

```js
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component="input" type="email" placeholder="Email"/>
        </div>
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
import { GenericFormFields, GenericForm, gReduxForm } from 'generic-redux-form'

const genericFormFields = new GenericFormFields('login', {
      email:{
        type: 'input',
        label: 'email',
        required: true,
        placeholder: 'EMAIL',
        default: 'my@email.com'
      },
      password:{
        type: 'input',
        label: 'password',
        required: true,
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
