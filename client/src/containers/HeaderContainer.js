import Header from '../components/Header';
import {connect} from 'react-redux';
// import {setSubjectChosen} from '../actions';


function mapStateToProps(state) {
  return {
    searchCoupons: state.searchCoupons,
    myZip: state.userPosition.zip,
    loggedIn: state.loggedIn
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     setSubjectChosen: function(subj) {
//       dispatch(setSubjectChosen(subj));
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default connect(mapStateToProps)(Header);
