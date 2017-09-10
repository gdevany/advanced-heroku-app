import {connect} from 'react-redux';
import ShowCoupons from '../components/ShowCoupons';
import {deleteCoupon,loadUsersCoupons} from '../actions';


function mapStateToProps(state) {
  return {
    coupons: state.coupons,
    searchCoupons: state.searchCoupons,
    loggedIn: state.loggedIn,
    usersCoupons: state.usersCoupons
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCoupon(id) {
      dispatch(deleteCoupon(id))
    },
    loadUsersCoupons(username) {
      dispatch(loadUsersCoupons(username))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowCoupons);
