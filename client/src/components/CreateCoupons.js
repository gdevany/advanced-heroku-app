//TODO - createCoupon, show success

import React from "react";

class CreateCoupons extends React.Component {
  constructor() {
    super();
    this.state = {
      coupons: {
        username: "",
        bizName: "",
        image: "",
        bizLogo: "",
        heading: "",
        couponDesc: "",
        restrictions: "",
        subject: "Food",
        subtopics: "",
        searchWords: "Fast Food",
        streetAndNum: "",
        city: "",
        zip: "",
        bizPhone: ""
      }
    };
  }

  // Dropdown list of Subjects
  showSubjectList = () => {
    return this.props.category.map((c, i) => {
      return (
        <option key={i} value={c.subject}>
          {c.subject}
        </option>
      );
    });
  };

  // Dropdown list of Subtopics
  showSubtopics = () => {
    return this.props.category.map((c, i) => {
      let st = "";
      if (c.subject === this.state.coupons.subject) {
        // map types to show in dropdown
        st = c.types.map((t, i) => {
          return (
            <option key={i} value={t}>
              {t}
            </option>
          );
        });
      }
      return st;
    });
  };

  render() {
    console.log(this.state.coupons);
    const { coupons } = this.state;
    const { showCreateCoupon, createCoupon, toggleShow, loggedIn } = this.props;

    //if 'Create New Coupon' NOT clicked, show nothing
    if (showCreateCoupon === false) {
      return <div></div>;
      //if 'Create New Coupon' clicked, show form
    } else {
      return (
        showCreateCoupon && (
          <div>
            <div className="formTextShadow text-center">
              <div className="formHeader">
                <h1>Create</h1>
                <h1>New Coupon</h1>
              </div>
              <form
                className="formInputText margin30top"
                onSubmit={e => {
                  e.preventDefault();
                  if (createCoupon) {
                    createCoupon(coupons);
                    alert("coupon created");
                  }
                  toggleShow();
                }}
              >
                <div className="margin20bottom">
                  Business Name: <br />
                  <input
                    placeholder="*required"
                    onChange={e => {
                      const bizName = {
                        bizName: e.target.value,
                        username: loggedIn
                      };
                      this.setState({
                        coupons: Object.assign(coupons, bizName)
                      });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Product Image Link: <br />
                  <input
                    placeholder="http://..."
                    onChange={e => {
                      const image = { image: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, image)
                      });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Business Logo Link: <br />
                  <input
                    placeholder="http://..."
                    onChange={e => {
                      const logo = { bizLogo: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, logo)
                      });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Buy One: <br />
                  <input
                    className="inputBottomMarginShort"
                    onChange={e => {
                      const item = { heading: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, item)
                      });
                    }}
                    maxLength="25"
                  />
                  <br />
                  <small>Get One Free</small>
                  <small className="floatRightWithPaddingAndPull">
                    {coupons.heading.length}/25
                  </small>
                </div>
                <div className="margin20bottom">
                  Coupon Description: <br />
                  <input
                    onChange={e => {
                      const desc = { couponDesc: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, desc)
                      });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Restrictions: <br />
                  <input
                    onChange={e => {
                      const restrict = { restrictions: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, restrict)
                      });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Business Address:
                  <br />
                  <div className="margin20bottom">
                    Number and Street Name:
                    <br />
                    <input
                      onChange={e => {
                        const address = { streetAndNum: e.target.value };
                        this.setState({
                          coupons: Object.assign(coupons, address)
                        });
                      }}
                    />
                    <br />
                  </div>
                  <div className="margin20bottom">
                    City:
                    <br />
                    <input
                      onChange={e => {
                        const city = { city: e.target.value };
                        this.setState({
                          coupons: Object.assign(coupons, city)
                        });
                      }}
                    />
                    <br />
                  </div>
                  <div className="margin20bottom">
                    Zipcode:
                    <br />
                    <input
                      onChange={e => {
                        const zip = { zip: e.target.value };
                        this.setState({
                          coupons: Object.assign(coupons, zip)
                        });
                      }}
                    />
                    <br />
                  </div>
                </div>
                <div className="margin20bottom">
                  Phone#:
                  <br />
                  <input
                    onChange={e => {
                      const phone = { phone: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, phone)
                      });
                    }}
                  />
                  <br />
                  <br />
                </div>
                <div className="margin20bottom">
                  Subject: <br />
                  <select
                    onChange={e => {
                      const subject = { subject: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, subject)
                      });
                    }}
                  >
                    {this.showSubjectList()}
                  </select>
                  <br />
                  <br />
                </div>
                <div className="margin20bottom">
                  Subtopic: <br />
                  <select
                    onChange={e => {
                      const subs = { searchWords: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, subs)
                      });
                    }}
                  >
                    {this.showSubtopics()}
                  </select>
                  <br />
                  <br />
                </div>
                <div className="containerShort">
                  <button
                    className="arrowContainer formButtonContainer"
                    onClick={toggleShow}
                  >
                    <i className="arrow backArrow" />
                    back
                  </button>
                  <button
                    className="arrowContainer formButtonContainer"
                    type="submit"
                  >
                    create
                    <i className="arrow forwardArrow" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      );
    }
  }
}

export default CreateCoupons;
