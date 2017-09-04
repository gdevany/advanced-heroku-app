import AppSign from '../AppSign';
import {connect} from 'react-redux';
import {loadUser} from '../actions';


function mapDispatchToProps(dispatch) {
  return {
    loadUser() {
      dispatch(loadUser())
    }
  }
}

export default connect(null, mapDispatchToProps)(AppSign);
