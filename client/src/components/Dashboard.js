import React                    from 'react';
import { Link }                 from 'react-router-dom';

import SurveyList               from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <h5 className="center-align">Surveys Dashboard</h5>

      <SurveyList />

      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating indigo">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard;
