import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import moment                   from 'moment';

import { fetchSurveys }         from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const now = moment().unix();

    return this.props.surveys.reverse().map(survey => {
      const stamp         = moment(survey.dateSent);
      let   dateDisplay   = stamp.format('[at] LT [on] Do MMM YYYY');

      if(now - stamp.unix() < (15 * 86400)) {   // Last fortnight
        dateDisplay = stamp.fromNow();
      }

      return (
        <div key={survey._id} className="card indigo darken-1">
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p><span className="small-info">Subject:</span> {survey.subject}</p>
            <p><span className="small-info">Question:</span> {survey.body}</p>
            <p className="right small-info">Sent {dateDisplay}</p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
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
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
