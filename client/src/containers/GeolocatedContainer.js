import {connect} from 'react-redux';
import Geolocated from '../components/Geolocated';
import {setZip} from '../actions';


function mapStateToProps(state) {
  return {
    userPosition: state.userPosition
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setZip(userPosition) {
      dispatch(setZip(userPosition))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocated);
