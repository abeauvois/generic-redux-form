import React from 'react'

const GenericFormField = (props) => {
  const { input, meta, component: Component, ...restProps } = props

  return (
    <Component
      {...input}
      {...restProps}
      meta={meta}
      error={meta.error && meta.touched}
      touched={meta.touched}
    />
  )
}

export default GenericFormField
