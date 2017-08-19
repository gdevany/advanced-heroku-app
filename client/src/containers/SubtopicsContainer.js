import {connect} from 'react-redux';
import Subtopics from '../components/Subtopics';


function mapStateToProps(state) {
  const subjectChosen = state;

  return {
    category: state.category[0]
  }
}

export default connect(mapStateToProps)(Subtopics);
