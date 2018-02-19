/*
   App.js - Main Component
   2018 Robert Durst
   https://github.com/robertDurst/blockandjerrys

   The structure of the this view is as follows:

    TOP LEFT: "Powered by LND."
    TOP RIGHT: Cone counter.
    HEADER: Block and Jerry's logo.
    CART: Varies by state.
      1. browseCart: shopping state, displays current cart
      2. checkoutCart: checkout state, displays invoice
      3. paidCart: paid state, displays paid confirmation and restart button
    BODY: Displays the ice cream selection.
*/

import React from 'react';
import {
  Grid,
  Row,
  Col,
  Image,
} from 'react-bootstrap';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import { connect } from 'react-redux';

import '../styles/App.css';
import logo from '../assets/logo.png';
import Cart from './cart';

// const styles = {
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.props.socket.on('INIT', ({ coneCount, cart }) => {
      this.props.handleInit({ coneCount, cart });
    });
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() { this.setState({ open: true }); }
  handleClose() { this.setState({ open: false }); }

  render() {
    return (
      <Grid style={{ display: 'flex', flexFlow: 'column nowrap' }}>
        <Row>
          <Col xs={2} md={1} style={{ backgroundColor: 'white' }}>
            <a href="http://dev.lightning.community/" target="_blank" rel="noopener noreferrer">
              <Image responsive rounded src="https://github.com/lightningnetwork/lnd/raw/master/logo.png" alt="LND logo" />
            </a>
          </Col>
          <Col xs={6} xsOffset={1} mdOffset={2} >
            <Image responsive rounded src={logo} alt="LND logo" style={{ paddingTop: '0.5em' }} />
          </Col>
          <Col xsOffset={0} xs={3} md={1} mdOffset={2} style={{ backgroundColor: 'white', padding: '0' }}>
            ConeCount: <b>{this.props.coneCount}</b>
          </Col>
        </Row>
        <Row>

          <div style={{ paddingTop: '1em', marginBottom: '1em', display: 'flex', flexFlow: 'row nowrap', overflowX: 'auto', boxShadow: '3px 5px 6px black' }}>
            {
              this.props.cart.map(x => (
                <Col key={x.id} xs={12} md={6}
                  style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', justifyContent: 'center', marginRight: '2px'  }}
                >
                  <Image src={x.img_url} style={{}}/>
                  <div style={{ display: 'flex', background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.2) 100%)', position: 'absolute', bottom: '0', width: '100%', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3em', lineHeight: '1em' }}>
                    <p>{x.flavor} <br /> <span style={{ fontSize: '0.5em', marginLeft: '0.5em' }}>${x.price}.00</span></p>
                    <FloatingActionButton
                      secondary
                      mini
                      onClick={() => this.props.handleAdd({ id: x.id })}
                      zDepth={0}
                      style={{ fontSize: '1rem' }}
                    >
                      <ContentAdd />
                    </FloatingActionButton>
                    { x.id < 4 && <Right color="white" style={{ position: 'absolute', right: '0', height: '1.1em', width: 'auto' }} /> }
                  </div>
                </Col>
                ))
            }
          </div>

        </Row>
        <Dialog open={this.state.open} onRequestClose={this.handleClose}>
          <Cart />
        </Dialog>
        <RaisedButton
          label="Checkout"
          secondary
          onClick={this.handleOpen}
        />
        <Row>
          <Col>
            Use of this website constitutes your acceptance of Block And Jerry&#39;s <a href="/t-and-c">Terms & Conditions</a>.
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  coneCount: state.coneCount,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  handleAdd: ({ id }) => {
    dispatch({ type: 'ADD', id });
  },
  handleInit: ({ coneCount, cart }) => {
    dispatch({ type: 'INIT', coneCount, cart });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
