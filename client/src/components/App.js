import React, { Component }     from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect }              from 'react-redux';

import * as actions             from '../actions';

import Header                   from './Header';
import Landing                  from './Landing';
import Dashboard                from './Dashboard';
import SurveyNew                from './surveys/SurveyNew';
import SurveyEdit               from './surveys/SurveyEdit';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route path="/" exact component={Landing} />
          <Route path="/surveys" exact component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/surveys/edit" component={SurveyEdit} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
