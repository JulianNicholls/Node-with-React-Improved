import React, { Component }     from 'react';
import StripeCheckout           from 'react-stripe-checkout';
import { connect }              from 'react-redux';

import * as actions             from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
         name="Emaily"
         description="$5 for five survey credits"
         amount={500}
         token={token => this.props.handleToken(token)}
         stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="ml-5 nav-item mt-1 btn-sm">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
