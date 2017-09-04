import AppSign from '../AppSign';
import {connect} from 'react-redux';
import {loadUser} from '../actions';


function mapDispatchToProps(dispatch) {
  return {
    loadUser(user) {
      dispatch(loadUser(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(AppSign);
