export function setSubjectChosen(subj) {
  return {
    type: "SET_SUBJECT_CHOSEN",
    value: subj
  }
}

export function setSearchCoupons(txt) {
  return {
    type: "SEARCH_COUPONS",
    value: txt
  }
}

export function loadFilteredCoupons(filter) {
  return function(dispatch) {
    dispatch({
      type: "LOAD_FILTERED_COUPONS",
      method: "GET"
    });
    fetch("/api/coupons/" + filter)
    .then((response) => {
      console.log(response);
      return response.json();
    }).then((coupons) => {
      console.log('loadFiltercoupons complete');
      dispatch(FilteredCouponsLoaded(coupons))
    })
  }
}

export function FilteredCouponsLoaded(coupons) {
  return {
    type: "FILTERED_COUPONS_LOADED",
    value: coupons
  }
}

export function loadUsersCoupons(username) {
  console.log(`loaduserscoupons username: ${username}`);
  return function(dispatch) {
    dispatch({
      type: "LOAD_USERS_COUPONS",
      method: "GET"
    });
    fetch("/api/coupons/" + username)
    // fetch("/api/coupons")
    .then((response) => {
      console.log(response);
      return response.json();
    }).then((coupons) => {
      console.log('loaduserscoupons complete');
      dispatch(UsersCouponsLoaded(coupons))
    })
  }
}

export function UsersCouponsLoaded(coupons) {
  return {
    type: "USERS_COUPONS_LOADED",
    value: coupons
  }
}

export function loadUser(user) {
  return {
    type: "USER_LOGGED_IN",
    value: user
  }
}

export function createCoupon(c) {
  console.log('in createcoupon');
  return function (dispatch) {
    fetch("api/coupons", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    })
    // .then(() => console.log(c.username))
    // .then(() => dispatch(loadUsersCoupons(c.username)));
  };
}

export function deleteCoupon(id) {
  return function (dispatch) {
    fetch(`/coupons/:${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(id)
    }).then(() => dispatch(loadUsersCoupons()));
  };
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
