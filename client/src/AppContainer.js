// This module not in use currently

import {connect} from 'react-redux';
import {handleSignIn, handleSignOut, handleSignUp, handleSubmit} from './actions';
// import SignUpIn from './SignUpIn';
// import App from './App';

function mapStateToProps(state) {
  return {
    searchCoupons: state.searchCoupons,
    loggedIn: state.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSignIn() {
      dispatch(handleSignIn())
    },
    handleSignOut() {
      dispatch(handleSignOut())
    },
    handleSignUp() {
      dispatch(handleSignUp())
    },
    handleSubmit() {
      dispatch(handleSubmit())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps);
