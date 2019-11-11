import Subjects from '../components/Subjects';
import {connect} from 'react-redux';
import {setSubjectChosen} from '../actions';


function mapStateToProps(state) {
  return {
    userPosition: state.userPosition,
    category: state.category,
    subjectChosen: state.subjectChosen,
    loggedIn: state.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSubjectChosen: function(subj) {
      dispatch(setSubjectChosen(subj));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
