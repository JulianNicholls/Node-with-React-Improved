// One field within the survey form

import React   from 'react';

export default ({ input, label, placeholder, meta: { touched, error } }) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" {...input} placeholder={placeholder}/>
        {touched && <div className="text-danger ml-2">{error}</div>}
      </div>
    </div>
  )
}
