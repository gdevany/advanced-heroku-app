import AppSign from '../components/AppSign';
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

export default connect(null, mapDispatchToProps)(AppSign);
