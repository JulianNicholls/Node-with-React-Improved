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
        return <li><a href="/auth/google">Login with Google</a></li>

      default:        // A user is logged in
        return [
          <li key="p"><Payments /></li>,
          <li key="c" className="spaced">Credits: {this.props.auth.credits}</li>,
          <li key="l"><a href="/api/logout">Log out</a></li>
        ];
    }
  }

  logoDestination() {
    return this.props.auth ? '/surveys' : '/';
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo spaced" to={this.logoDestination()}>
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
