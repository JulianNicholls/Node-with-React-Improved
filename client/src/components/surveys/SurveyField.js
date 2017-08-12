// One field within the survey form

import React   from 'react';

export default ({ input, label, placeholder, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...input} placeholder={placeholder}/>
      {touched && <div className="red-text survey-error">{error}</div>}
    </div>
  )
}
