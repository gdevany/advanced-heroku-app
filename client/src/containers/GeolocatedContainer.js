import {connect} from 'react-redux';
import Geolocated from '../components/Geolocated';
import {setZip} from '../actions';


function mapStateToProps(state) {
  return {
    zip: state.zip
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setZip(zip) {
      dispatch(setZip(zip))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocated);
