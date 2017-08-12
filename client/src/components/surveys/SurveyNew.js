// SurveyNew shows SurveyForm and SurveyReview

import React, { Component }     from 'react';
import { reduxForm }            from 'redux-form';

import SurveyForm               from './SurveyForm';
import SurveyReview             from './SurveyReview';

class SurveyNew extends Component {
  state = { showReview: false }

  renderContent() {
    if (this.state.showReview) {
      return <SurveyReview onBack={() => this.setState({ showReview: false })} />;
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showReview: true })} />;
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
};

// Connect to reduxForm to clear out the fields when cancelled
// because this component will unmount and thereby clear the fields.
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
