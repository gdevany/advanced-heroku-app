import SignUpIn from '../components/SignUpIn';
import {connect} from 'react-redux';
import {loadUser, loadUsersCoupons} from '../actions';


function mapDispatchToProps(dispatch) {
  return {
    loadUser(user) {
      dispatch(loadUser(user))
    },
    loadUsersCoupons(user) {
      dispatch(loadUsersCoupons(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(SignUpIn);
