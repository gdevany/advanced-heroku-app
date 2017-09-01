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

export function loadUser(user) {
  console.log("here- loadUser() in actions");
  return {
    type: "USER_LOGGED_IN",
    value: user
  }
}


// export function loadUser(user) {
//   return function(dispatch) {
//     dispatch({
//       type: "LOAD_USER"
//     });
//     fetch('./user')
//     .then((response) => {
//       return response.json();
//     }).then((user) => {
//       dispatch(userLoaded(user))
//     })
//   }
// }
//
// export function userLoaded(user) {
//   return {
//     type: "USER_LOGGED_IN",
//     value: user
//   }
// }
