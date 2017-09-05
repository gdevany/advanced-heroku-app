import {connect} from 'react-redux';
import ShowCoupons from '../components/ShowCoupons';
import {deleteCoupon} from '../actions';


function mapStateToProps(state) {
  return {
    coupons: state.coupons,
    searchCoupons: state.searchCoupons,
    loggedIn: state.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCoupon(id) {
      dispatch(deleteCoupon(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowCoupons);
