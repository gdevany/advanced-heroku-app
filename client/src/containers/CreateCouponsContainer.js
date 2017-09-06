import {connect} from 'react-redux';
import CreateCoupons from '../components/CreateCoupons';
// import {deleteCoupon} from '../actions';


function mapStateToProps(state) {
  return {
    category: state.category
  }
}

export default connect(mapStateToProps)(CreateCoupons);
