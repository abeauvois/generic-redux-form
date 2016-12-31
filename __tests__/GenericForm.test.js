import React, { Component } from 'react'
import TestUtils from 'react-addons-test-utils'
// import { createSpy } from 'expect'
// import { Provider } from 'react-redux'
// import { combineReducers, createStore } from 'redux'
// import { submit } from '../actions'

import { GenericForm, GenericFormFields, Constants, Validators } from '../src'

describe('GenericForm init', ()=> {
  const data = {
    email:{
      type: 'input',
      label: 'email',
      validator: Validators.email,
      iconName: 'ios-person',
      default: 'my@email.com'
    },
    password:{
      type: 'input',
      label: 'password',
      validator: Validators.required,
      iconName: 'ios-lock',
      placeholder: 'PASSWORD',
      default: 'test',
    }
  }
  const genericFormFields = new GenericFormFields('login', data)

  it('should throw an error if not wrapped in Generic ReduxForm', () => {
    expect(() => {
      TestUtils.renderIntoDocument(<div>
        <GenericForm/>
      </div>
      )
    }).toThrow(/must be inside a component decorated with gReduxForm/)
  })

  //   it('should call the onSubmit given to <Form> when SUBMIT action is dispatched', () => {
  //     const store = makeStore({
  //       testForm: {
  //         values: {
  //           foo: 42
  //         }
  //       }
  //     })
  //     const onSubmit = createSpy()
  //     class TestForm extends Component {
  //       render() {
  //         return (
  //           <Form onSubmit={this.props.handleSubmit(onSubmit)}>
  //             <Field name="foo" component="input"/>
  //           </Form>
  //         )
  //       }
  //     }
  //     const DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm)
  //     TestUtils.renderIntoDocument(
  //       <Provider store={store}>
  //         <DecoratedTestForm/>
  //       </Provider>
  //     )
  //
  //     expect(onSubmit).toNotHaveBeenCalled()
  //
  //     store.dispatch(submit('testForm'))
  //
  //     expect(onSubmit).toHaveBeenCalled()
  //     expect(onSubmit.calls.length).toBe(1)
  //     expect(onSubmit.calls[0].arguments[0]).toEqualMap({ foo: 42 })
  //   })

})

// describe('Generic', () => {
//
//   it('should output a <form> element with all props mapped', () => {
//     const store = makeStore({
//       testForm: {
//         values: {
//           foo: 42
//         }
//       }
//     })
//     const onSubmit = createSpy()
//     class TestForm extends Component {
//       render() {
//         return (
//           <Form onSubmit={onSubmit} action="/save" method="post" target="_blank">
//             <Field name="foo" component="input"/>
//           </Form>
//         )
//       }
//     }
//     const DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm)
//     const dom = TestUtils.renderIntoDocument(
//       <Provider store={store}>
//         <DecoratedTestForm/>
//       </Provider>
//     )
//
//     expect(onSubmit).toNotHaveBeenCalled()
//
//     const tag = TestUtils.findRenderedDOMComponentWithTag(dom, 'form')
//
//     // 🤢 This line is DISGUSTING!! Is there a better way to get the props on the <form> ??
//     const props = tag[Object.keys(tag)[0]]._currentElement.props
//
//     expect(props.onSubmit).toBe(onSubmit)
//     expect(props.action).toBe('/save')
//     expect(props.method).toBe('post')
//     expect(props.target).toBe('_blank')
//   })
//
//   it('should call the onSubmit given to <Form> when instance API submit() is called', () => {
//     const store = makeStore({
//       testForm: {
//         values: {
//           foo: 42
//         }
//       }
//     })
//     const onSubmit = createSpy().andReturn(7)
//     class TestForm extends Component {
//       render() {
//         return (
//           <Form onSubmit={this.props.handleSubmit(onSubmit)}>
//             <Field name="foo" component="input"/>
//           </Form>
//         )
//       }
//     }
//     const DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm)
//     const dom = TestUtils.renderIntoDocument(
//       <Provider store={store}>
//         <DecoratedTestForm/>
//       </Provider>
//     )
//
//
//     const decoratedForm = TestUtils.findRenderedComponentWithType(dom, DecoratedTestForm)
//
//     expect(onSubmit).toNotHaveBeenCalled()
//
//     const result = decoratedForm.submit()
//     expect(result).toBe(7)
//
//     expect(onSubmit).toHaveBeenCalled()
//     expect(onSubmit.calls.length).toBe(1)
//     expect(onSubmit.calls[0].arguments[0]).toEqualMap({ foo: 42 })
//   })

//   it('should properly handle submission errors', () => {
//     const store = makeStore({
//       testForm: {
//         values: {
//           foo: 42
//         }
//       }
//     })
//     const onSubmit = createSpy().andThrow(new SubmissionError({ _error: 'Invalid' }))
//     const formRender = createSpy()
//     class TestForm extends Component {
//       render() {
//         formRender(this.props)
//         return (
//           <Form onSubmit={this.props.handleSubmit(onSubmit)}>
//             <Field name="foo" component="input"/>
//           </Form>
//         )
//       }
//     }
//     const DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm)
//     const dom = TestUtils.renderIntoDocument(
//       <Provider store={store}>
//         <DecoratedTestForm/>
//       </Provider>
//     )
//
//     expect(formRender).toHaveBeenCalled()
//     expect(formRender.calls.length).toBe(1)
//
//     const decoratedForm = TestUtils.findRenderedComponentWithType(dom, DecoratedTestForm)
//
//     expect(onSubmit).toNotHaveBeenCalled()
//
//     decoratedForm.submit()
//
//     expect(onSubmit).toHaveBeenCalled()
//     expect(onSubmit.calls.length).toBe(1)
//     expect(onSubmit.calls[0].arguments[0]).toEqualMap({ foo: 42 })
//
//     expect(formRender.calls.length).toBe(3)
//     expect(formRender.calls[2].arguments[0].error).toBe('Invalid')
//   })
// })
