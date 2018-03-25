import React from 'react';
import {
  Router,
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

import HomeCart from './homeCart';
import InfoCart from './infoCart';
import QRCart from './checkoutCart';
import Paid from './paidCart';
import AboutUs from './AboutUs';
import TAndC from './TAndC';
import history from '../history';

const Cart = ({ socket, handleInvoice, handleConeUpdate }) => {
  socket.on('INVOICE', ({ invoice }) => {
    handleInvoice({ invoice });
    history.push('/qr');
  });

  socket.on('PAID', () => {
    console.log('CLIENT PAID');
    history.push('/paid');
  });

  socket.on('DONUT_UPDATE', ({ donutCount }) => {
    handleConeUpdate({ donutCount });
  });

  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={HomeCart} />
        <Route path="/checkout" component={InfoCart} />
        <Route path="/qr" component={QRCart} />
        <Route path="/paid" component={Paid} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/t-and-c" component={TAndC} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  socket: state.socket,
  quantities: state.quantities,
});

const mapDispatchToProps = dispatch => ({
  handleInvoice: ({ invoice }) => {
    dispatch({ type: 'RECEIVED_INVOICE', invoice });
  },
  handleConeUpdate: ({ donutCount }) => {
    dispatch({ type: 'DONUT_UPDATE', donutCount });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
