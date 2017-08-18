import {combineReducers} from 'redux';




function category(state = [], action){
  if(action.type === "SET_CATEGORY"){
    return action.value;
  }
  return state;
}



const rootReducer = combineReducers({
  category
});
export default rootReducer;
