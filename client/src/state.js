export default {
  subjectChosen: "",
  searchCoupons: "",
  loggedIn: "",
  usersCoupons: [],
  filteredCoupons: [],
  userPosition: {
    zip: 0,
    pos: {
      lat: 0,
      lng: 0
    }
  },

  //---vvvvv----- below this -----vvvvv-----   move to server
  // Remember to change mapStateToProps to server, not state.
  //
  category: [
    {
      subject: "Food",
      types: ["Fast Food", "Sit Down", "Regional", "Fine Dining"]
    },
    {
      subject: "Merchandise",
      types: ["Clothing", "Auto", "Grocery"]
    },
    {
      subject: "Health & Wellness",
      types: ["Spa Treatments", "Hair & Face", "Products", "Other"]
    },
    {
      subject: "Hotels",
      types: ["Cheap", "Fancy", "Other"]
    },
    {
      subject: "Sports & Outdoors",
      types: ["Golf", "Bowling", "Other"]
    },
    {
      subject: "Other",
      types: ["Other"]
    }
  ]
};
