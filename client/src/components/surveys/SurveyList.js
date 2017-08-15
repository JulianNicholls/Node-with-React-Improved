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
      const stamp       = moment(survey.dateSent);
      let   dateDisplay = stamp.format('[at] LT [on] Do MMM YYYY');

      if(now - stamp.unix() < (15 * 86400)) {   // Last fortnight
        dateDisplay = stamp.format('[at] LT, ') + stamp.fromNow();
      }

      return (
        <div key={survey._id} className="card my-3 bg-info text-white">
          <div className="card-header">{survey.title}</div>
          <div className="card-body">
            <h4 className="card-title">{survey.subject}</h4>
            <p className="card-text">
              Question: {survey.body}<br/>
            Yes <span className="badge badge-success mx-2">{survey.yes}</span>
          No <span className="badge badge-danger ml-2">{survey.no}</span>
            </p>
          </div>
          <div className="card-footer">Sent {dateDisplay}</div>
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
