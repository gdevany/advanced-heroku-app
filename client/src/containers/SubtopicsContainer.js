import {connect} from 'react-redux';
import Subtopics from '../components/Subtopics';
import {setSearchCoupons, setSubjectChosen, loadFilteredCoupons} from '../actions';


function mapStateToProps(state) {
 return {
   subjectChosen: state.subjectChosen,
   searchCoupons: state.searchCoupons,
   loggedIn: state.loggedIn
 }
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchCoupons: function(subtopic) {
      dispatch(setSearchCoupons(subtopic));
    },
    setSubjectChosen: function(subj) {
      dispatch(setSubjectChosen(subj));
    },
    loadFilteredCoupons: function(filter) {
      dispatch(loadFilteredCoupons(filter));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Subtopics);
