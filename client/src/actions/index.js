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
