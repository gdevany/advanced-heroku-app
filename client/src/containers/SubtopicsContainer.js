import {connect} from 'react-redux';
import Subtopics from '../components/Subtopics';
import {setSearchCoupons} from '../actions';


function mapStateToProps(state) {
 return {
   subjectChosen: state.subjectChosen,
   searchCoupons: state.searchCoupons
 }
}

function mapDispatchToProps(dispatch) {
  return {
    set: function(subtopic) {
      dispatch(setSearchCoupons(subtopic));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Subtopics);
