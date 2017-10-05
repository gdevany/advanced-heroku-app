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

export function setZip(zip) {
  return {
    type: "SET_ZIP",
    value: zip
  }
}

export function loadGoogleAddress(lon, lat) {
  return function(dispatch) {
    dispatch({
      type: "LOAD_GOOGLE_ADDRESS",
      headers: {"Content-Type": "application/json"},
      method: "GET"
    });
    fetch("/api/zipit/" + lon + "/" + lat)
     .then((response) => {
      return response.json();
    }).then((address) => {
      console.log(address);
      dispatch(GoogleAddressLoaded(address))
    })
  }
}

export function GoogleAddressLoaded(address) {
  console.log(address);

  return {
    // console.log(address);
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
      return response.json();
    }).then((coupons) => {
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
  return function(dispatch) {
    dispatch({
      type: "LOAD_USERS_COUPONS",
      method: "GET"
    });
    fetch("/api/coupons/" + username)
    .then((response) => {
      return response.json();
    }).then((coupons) => {
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
  return function (dispatch) {
    fetch("api/coupons", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(c)
    })
    .then(() => dispatch(loadUsersCoupons(c.username)));
  };
}

export function deleteCoupon(coupon2BDeleted) {
  return function (dispatch) {
    fetch("/api/coupons/" + coupon2BDeleted._id, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    })
    // .then(response => {
    //   return response.json()
    // })
    // .then(() => dispatch(loadUsersCoupons()));
  };
}
