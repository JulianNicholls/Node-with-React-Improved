// SurveyEdit shows SurveyForm and SurveyReview

import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { reduxForm }          from 'redux-form';

import SurveyForm             from './SurveyForm';
import SurveyReview           from './SurveyReview';

class SurveyEdit extends Component {
  state = { showReview: false }

  renderContent() {
    if (this.state.showReview) {
      return <SurveyReview onBack={() => this.setState({ showReview: false })} />;
    }

    return <SurveyForm title="Edit Survey" onSurveySubmit={() => this.setState({ showReview: true })} />;
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
};

function mapStateToProps({ surveys }) {
  return {
    initialValues: surveys.current
  }
}

// Connect to reduxForm to clear out the fields when cancelled
// because this component will unmount and thereby clear the fields.
export default connect(mapStateToProps)(reduxForm({
  form: 'surveyForm'
})(SurveyEdit));
