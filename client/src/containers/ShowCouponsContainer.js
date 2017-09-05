import {connect} from 'react-redux';
import ShowCoupons from '../components/ShowCoupons';


function mapStateToProps(state) {
  return {
    coupons: state.coupons,
    searchCoupons: state.searchCoupons,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(ShowCoupons);
