import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { Link }                 from 'react-router-dom';

import Payments                 from './Payments';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:      // Still deciding, no content
        return;

      case false:     // No user is logged in
        return <li className="nav-item"><a className="nav-link" href="/auth/google">Login with Google</a></li>

      default:        // A user is logged in
        return [
          <li key="p" className="nav-item"><Payments /></li>,
          <span key="c" className="navbar-text mx-sm-3">Credits: {this.props.auth.credits}</span>,
          <li key="l" className="nav-item"><a className="nav-link" href="/api/logout">Log out</a></li>
        ];
    }
  }

  logoDestination() {
    return this.props.auth ? '/surveys' : '/';
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to={this.logoDestination()}>
          Emaily
        </Link>
        <ul className="navbar-nav">
          {this.renderContent()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
