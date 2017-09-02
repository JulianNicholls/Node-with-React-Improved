// Show the review page before sending the survey

import React            from 'react';
import { connect }      from 'react-redux';
import { withRouter }   from 'react-router-dom';

import * as actions     from '../../actions';

import formFields       from './formFields';

const SurveyReview = ({ onBack, values, saveSurvey, submitSurvey, history }) => {
  const reviewFields = formFields.map(({name, label}) => {
    return (
      <tr key={name}>
        <th className="form-review-label">{label}</th>
        <td>{values[name]}</td>
      </tr>
    );
  });

  return (
    <div>
      <h4 className="text-center mt-3">Please confirm your entries</h4>

      <table className="table table-sm form-review">
        <tbody>
          {reviewFields}
        </tbody>
      </table>

      <button
        className="btn btn-warning"
        onClick={onBack}>
        Back
      </button>

      <button
        className="float-right btn btn-primary"
        onClick={() => submitSurvey(values, history)}>
        <i className="fa fa-send"></i>
        &nbsp;Send Survey
      </button>

      <button
        className="float-right btn btn-primary mr-2"
        onClick={() => saveSurvey(values, history)}>
        <i className="fa fa-save"></i>
        &nbsp;Save
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
