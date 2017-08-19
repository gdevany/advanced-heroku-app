import {connect} from 'react-redux';
import Subtopics from '../components/Subtopics';


function mapStateToProps(state) {
 return {
   category: state.subjectChosen,
   subjectChosen: state.subjectChosen
 }

}

export default connect(mapStateToProps)(Subtopics);
