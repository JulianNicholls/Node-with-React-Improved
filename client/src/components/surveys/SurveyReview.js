// Show the review page before sending the survey

import React            from 'react';
import { connect }      from 'react-redux';
import { withRouter }   from 'react-router-dom';

import * as actions     from '../../actions';

import formFields       from './formFields';

const SurveyReview = ({ onBack, values, submitSurvey, history }) => {
  const reviewFields =  formFields.map(({name, label}) => {
    return (
      <tr key={name}>
        <th className="form-review-label">{label}</th>
        <td>{values[name]}</td>
      </tr>
    );
  });

  return (
    <div>
      <h5 className="center-align">Please confirm your entries</h5>

      <table className="form-review bordered">
        <tbody>
          {reviewFields}
        </tbody>
      </table>

      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onBack}>
        Back
      </button>

      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(values, history)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
     values: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
