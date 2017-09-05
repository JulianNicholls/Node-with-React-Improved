import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { withRouter }           from 'react-router-dom';
import moment                   from 'moment';

import { fetchSurveys, setCurrentSurvey }   from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  loadForEdit(data) {
    this.props.setCurrentSurvey(data);

    // Redirect here
    this.props.history.push('/surveys/edit');
  }

  renderSurveys() {
    const now = moment().unix();

    return this.props.surveys.reverse().map(survey => {
      let dateDisplay = 'Unsent';

      if (survey.dateSent && survey.dateSent !== '') {
        const stamp = moment(survey.dateSent);

        dateDisplay = stamp.format('[Sent at] LT [on] Do MMM YYYY');

        const secsAgo = now - stamp.unix();

        if(secsAgo < 86400) {          // Last day
          dateDisplay = `Sent ${stamp.fromNow()}`;
        }
        else if(secsAgo < (15 * 86400)) {   // Last fortnight
          dateDisplay = stamp.format('[Sent at] LT, ') + stamp.fromNow();
        }
      }

      return (
        <div key={survey._id} className="card my-3 bg-info text-white">
          <div className="card-header">{survey.title}</div>
          <div className="card-body">
            <h5 className="card-title">{survey.subject}</h5>
            <p className="card-text">
              Question: {survey.body}<br/>
              Yes <span className="badge badge-success mx-2">{survey.yes}</span>
              No <span className="badge badge-danger ml-2">{survey.no}</span>
            </p>
          </div>
          <div className="card-footer">
            {dateDisplay}
            <button className="float-right btn btn-primary" onClick={() => this.loadForEdit(survey)}>
              <i className="fa fa-edit"></i>
              &nbsp;Edit
            </button>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
};

function mapStateToProps({ surveys }) {
  return { surveys: surveys.list };
}

export default connect(mapStateToProps, { fetchSurveys, setCurrentSurvey })(withRouter(SurveyList));
