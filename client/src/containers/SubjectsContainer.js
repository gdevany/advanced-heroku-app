import Subjects from '../components/Subjects';
import {connect} from 'react-redux';
import {setSubjectChosen} from '../actions';


function mapStateToProps(state) {
  return {
    category: state.category,
    subjectChosen: state.subjectChosen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: function(subj) {
      dispatch(setSubjectChosen(subj));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
