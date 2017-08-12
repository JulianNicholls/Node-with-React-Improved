import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { Redirect }             from 'react-router-dom';

class Landing extends Component {
  render() {
    if (this.props.auth) {
      return <Redirect to="/surveys" />;
    }

    return (
      <div className="central">
        <h1 className="center-align">Emaily</h1>
        <ol className="bigger">
          <li>Create professional surveys</li>
          <li>Collect feedback from your users</li>
          <li>Profit!</li>
        </ol>
        <a href="/auth/google" className="center-align btn-large">Get Started</a>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
