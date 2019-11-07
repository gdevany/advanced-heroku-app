import {connect} from 'react-redux';
import Geolocated from '../components/Geolocated';
import {setZip} from '../actions';


function mapStateToProps(state) {
  return {
    userPosition: state.userPosition,
    searchCoupons: state.searchCoupons,
    filteredCoupons: state.filteredCoupons,
    usersCoupons: state.usersCoupons,
    loggedIn: state.loggedIn
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
