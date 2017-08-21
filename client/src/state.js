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
      "types": [
        "Clothing",
        "Auto",
        "Grocery"]
    },
    {
      "subject": "Home Goods",
      "types": [
        "Retailer",
        "Item Specific",
        "Etc"]
    },
    {
      "subject": "Hotels",
      "types": [
        "Cheap",
        "Fancy",
        "Other"]
    },
    {
      "subject": "Sports",
      "types": [
        "Golf",
        "Bowling",
        "Other"]
    },
  ],
  coupons: [
    {
      id: 1,
      bizName: "Mcdonalds",
      bizLogo: "",
      heading: "BigMac",
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
      heading: "Whopper",
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
      heading: "Chick-Fil-A sandwich",
      couponDesc: "Buy 1 Chick-Fil-A sandwich and receive 1 Chick-Fil-A sandwich free!",
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
      id: 4,
      bizName: "Chuys",
      bizLogo: "",
      heading: "taco",
      couponDesc: "Buy 1 taco and receive 1 taco free!",
      restrictions: "One coupon per day",
      searchWords: ["Sit Down"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        }
    },
    {
      id: 5,
      bizName: "Home Slice",
      bizLogo: "",
      heading: "slice of pizza",
      couponDesc: "Buy 1 slice of pizza and receive 1 slice of pizza free!",
      restrictions: "One coupon per day",
      searchWords: ["Regional"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        }
    }
  ]
}
