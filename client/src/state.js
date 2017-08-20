export default {
  subjectChosen: "",
  searchCoupons: "",
  category: [
    {
      "subject": "Eat Now",
      "types": [
        "Fast Food",
        "Sit Down",
        "Regional",
        "Fine Dining"]
    },
    {
      "subject": "Merchandise",
      "types": ["Clothing",
      "Auto",
      "Grocery"]
    },
    {
      "subject": "Home Goods",
      "types": ["Retailer",
      "Item Specific",
      "Etc"]
    },
  ],
  coupons: [
    {
      id: 1,
      bizName: "Mcdonalds",
      bizLogo: "",
      heading: "Buy 1 BigMac, Get One Free",
      couponDesc: "Buy 1 Bigmac and receive 1 BigMac free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        }
    },
    {
      id: 2,
      bizName: "Burger King",
      bizLogo: "",
      heading: "Buy 1 Whopper, Get One Free",
      couponDesc: "Buy 1 Whopper and receive 1 Whopper free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Oak St",
          city: "Austin",
          zip: 78701
        }
    },
    {
      id: 3,
      bizName: "Chick-Fil-A",
      bizLogo: "",
      heading: "Buy 1 Chick-Fil-A sandwich, Get One Free",
      couponDesc: "Buy 1 Chick-Fil-A sandwich and receive 1 Chick-Fil-A sandwich free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        }
    }
  ]
}
