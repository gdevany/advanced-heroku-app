import {combineReducers} from 'redux';


function category(state = [], action){
  if(action.type === "SHOW_CATEGORY"){
    return action.value;
  }
  return state;
}

function userPosition(state = {}, action){
  if(action.type === "SET_ZIP"){
    return action.value;
  }
  return state;
}

function subjectChosen(state={}, action){
  if(action.type === "SET_SUBJECT_CHOSEN"){
    return action.value;
  }
  return state;
}

function coupons(state=[], action) {
  if (action.type === "SET_COUPONS_TO_STATE"){
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

function filteredCoupons(state=[], action) {
  if(action.type === "FILTERED_COUPONS_LOADED") {
    return action.value;
  }
  return state;
}

function usersCoupons(state=[], action) {
  if(action.type === "USERS_COUPONS_LOADED") {
    return action.value;
  }
  return state;
}

function loggedIn(state="", action) {
  if(action.type === "USER_LOGGED_IN") {
    return action.value;
  }
  return state;
 }


const rootReducer = combineReducers({
  category, subjectChosen,coupons,searchCoupons,usersCoupons,loggedIn,
  filteredCoupons,userPosition
});
export default rootReducer;
