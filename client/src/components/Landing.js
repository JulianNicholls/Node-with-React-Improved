import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { Redirect }             from 'react-router-dom';

class Landing extends Component {
  render() {
    if (this.props.auth) {
      return <Redirect to="/surveys" />;
    }

    return (
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4 text-center">Emaily<small> - professional surveys</small></h1>
          <p className="lead my-4">Three steps to a better business</p>

          <ol>
            <li>Create professional surveys</li>
            <li>Collect feedback from your users</li>
            <li>Profit!</li>
          </ol>
          <a href="/auth/google" className="btn btn-lg btn-primary" role="button">Get Started</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
