import React        from 'react';
import { Link }     from 'react-router-dom';

import SurveyList   from './surveys/SurveyList';

const Dashboard = () => (
  <div>
    <h4 className="text-center mt-3">Surveys Dashboard</h4>

    <SurveyList />

    <Link to="/surveys/new" className="float-right btn btn-large">
      <i className="fa fa-plus-circle fa-4x"></i>
    </Link>
  </div>
);

export default Dashboard;
