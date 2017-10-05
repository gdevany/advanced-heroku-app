import {connect} from 'react-redux';
import Geolocated from '../components/Geolocated';
import {setZip, loadGoogleAddress} from '../actions';


function mapStateToProps(state) {
  return {
    zip: state.zip
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setZip(zip) {
      dispatch(setZip(zip))
    },
    loadGoogleAddress(lat,lon) {
      dispatch(loadGoogleAddress(lat,lon))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocated);
