import {connect} from 'react-redux';
import CreateCoupons from '../components/CreateCoupons';
import {createCoupon, loadUsersCoupons} from '../actions';
// import {deleteCoupon} from '../actions';


function mapStateToProps(state) {
  return {
    category: state.category,
    loggedIn: state.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createCoupon: (c) => {
      dispatch(createCoupon(c))
    },
    loadUsersCoupons: (username) => {
      dispatch(loadUsersCoupons(username))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateCoupons);
