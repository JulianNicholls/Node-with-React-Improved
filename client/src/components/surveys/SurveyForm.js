// Show the survey form

import React, { Component }   from 'react';
import { reduxForm, Field }   from 'redux-form';
import { Link }               from 'react-router-dom';

import SurveyField            from './SurveyField';
import formFields             from './formFields';

import validateEmails         from '../../utils/validateEmails';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ name, label, placeholder }) => {
      return <Field key={name} component={SurveyField} name={name} label={label} placeholder={placeholder} />;
    })
  }

  render() {
    return (
      <div>
        <h4 className="text-center mt-3">New Survey</h4>

        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/surveys" className="btn btn-warning">
            Cancel
          </Link>

          <button type="submit" className="float-right btn btn-primary">
            Next
          </button>
        </form>
      </div>
    );
  }
};

function validate(values) {
  const errors = {};

  formFields.forEach(({ name, errorText }) => {
    if (!values[name]) {
      errors[name] = errorText;
    }
  });

  if (values.recipients) {
    errors.recipients = validateEmails(values.recipients);
  }

  return errors;
}

export default reduxForm({
  form:     'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
