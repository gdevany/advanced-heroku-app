import {combineReducers} from 'redux';




function category(state = [], action){
  if(action.type === "SHOW_CATEGORY"){
    return action.value;
  }
  return state;
}

function subjectChosen(state={}, action){
  if(action.type === "SET_SUBJECT"){
    return action.value;
  }
  return state;
}

function coupons(state=[], action) {
  if (action.type === "SHOW_COUPON"){
    return action.value;
  }
  return state;
}

function searchCoupons(state="", action) {
  if (action.type === "SEARCH_COUPONS") {
    return action.value;
  }
  return state;
}



const rootReducer = combineReducers({
  category, subjectChosen,coupons,searchCoupons
});
export default rootReducer;
