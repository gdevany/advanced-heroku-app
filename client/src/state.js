export default {
  subjectChosen: "",
  searchCoupons: "",
  //---vvvvv----- below this -----vvvvv-----   move to server
  // Remember to change mapStateToProps to server, not state.
  // 
  users: [],
  loggedIn: {},
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
      username: "xx@yahoo.com",
      bizName: "Mcdonalds",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg",
      heading: "BigMac",
      couponDesc: "Buy 1 Bigmac and receive 1 BigMac free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "(123) 456-7890"
    },
    {
      id: 2,
      username: "xx@yahoo.com",
      bizName: "Burger King",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/commons/5/55/BurgerKingLogoDileo.png",
      heading: "Whopper",
      couponDesc: "Buy 1 Whopper and receive 1 Whopper free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Oak St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-123-456"
    },
    {
      id: 3,
      username: "xx@yahoo.com",
      bizName: "Chick-Fil-A",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/en/0/02/Chick-fil-A_Logo.svg",
      heading: "Chick-Fil-A sandwich",
      couponDesc: "Buy 1 Chick-Fil-A sandwich and receive 1 Chick-Fil-A sandwich free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-345-6789"
    },
    {
      id: 4,
      username: "xx@yahoo.com",
      bizName: "Chuys",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/en/2/2d/Chuy%27s.png",
      heading: "Appetizer",
      couponDesc: "Buy 1 appetizer and receive 1 appetizer free!",
      restrictions: "One coupon per day",
      searchWords: ["Sit Down"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-987-6543"
    },
    {
      id: 5,
      bizName: "Home Slice",
      username: "xx@yahoo.com",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "http://www.homeslicepizza.com/images/logo.gif",
      heading: "slice of pizza",
      couponDesc: "Buy 1 slice of pizza and receive 1 slice of pizza free!",
      restrictions: "One coupon per day",
      searchWords: ["Regional", "Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-555-6789"
    },
    {
      id: 6,
      username: "xx@yahoo.com",
      bizName: "Mcdonalds",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg",
      heading: "BigMac",
      couponDesc: "Buy 1 Bigmac and receive 1 BigMac free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "(123) 456-7890"
    },
    {
      id: 7,
      username: "xx@yahoo.com",
      bizName: "Burger King",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/commons/5/55/BurgerKingLogoDileo.png",
      heading: "Whopper",
      couponDesc: "Buy 1 Whopper and receive 1 Whopper free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Oak St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-123-456"
    },
    {
      id: 8,
      username: "xx@yahoo.com",
      bizName: "Chick-Fil-A",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/en/0/02/Chick-fil-A_Logo.svg",
      heading: "Chick-Fil-A sandwich",
      couponDesc: "Buy 1 Chick-Fil-A sandwich and receive 1 Chick-Fil-A sandwich free!",
      restrictions: "One coupon per day",
      searchWords: ["Fast Food"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-345-6789"
    },
    {
      id: 9,
      username: "xx@yahoo.com",
      bizName: "Chuys",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "https://upload.wikimedia.org/wikipedia/en/2/2d/Chuy%27s.png",
      heading: "Appetizer",
      couponDesc: "Buy 1 appetizer and receive 1 appetizer free!",
      restrictions: "One coupon per day",
      searchWords: ["Sit Down"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-987-6543"
    },
    {
      id: 10,
      username: "xx@yahoo.com",
      bizName: "Home Slice",
      bizQR: "https://barcode1.in/wp-content/assets/sites/16/QR-Code-Standard.jpg",
      bizLogo: "http://www.homeslicepizza.com/images/logo.gif",
      heading: "slice of pizza",
      couponDesc: "Buy 1 slice of pizza and receive 1 slice of pizza free!",
      restrictions: "One coupon per day",
      searchWords: ["Regional"],
      bizAddress:
        {
          streetAndNum: "1234 Main St",
          city: "Austin",
          zip: 78701
        },
      bizPhone: "512-555-6789"
    }
  ]
}
