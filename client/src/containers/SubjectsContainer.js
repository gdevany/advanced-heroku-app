import Subjects from '../components/Subjects';
import {connect} from 'react-redux';



function mapStateToProps(state) {
  console.log(state);
  return {
    category: state.category
  }
}

export default connect(mapStateToProps)(Subjects);
