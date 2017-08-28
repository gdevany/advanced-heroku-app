export function setSubjectChosen(subj) {
  return {
    type: "SET_SUBJECT",
    value: subj
  }
}

export function setSearchCoupons(txt) {
  return {
    type: "SEARCH_COUPONS",
    value: txt
  }
}

export function loadUsers() {
  return function(dispatch) {
  dispatch({
    type: "LOAD_USERS"
  });
  fetch('./users')
  .then((response) => {
    return response.json();
  }).then((users) => {
    dispatch(usersLoaded(users))
  })
}
}

export function usersLoaded(users) {
  return {
    type: "USERS_LOADED",
    value: users
  }
}
