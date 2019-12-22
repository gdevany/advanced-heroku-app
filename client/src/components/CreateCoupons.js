//TODO - createCoupon, show success

import React from "react";

class CreateCoupons extends React.Component {
  constructor() {
    super();
    this.state = {
      // coupons: {
      //   username: "",
      //   bizName: "",
      //   image: "",
      //   bizLogo: "",
      //   heading: "",
      //   couponDesc: "",
      //   restrictions: [{ restriction: "", i: 0 }],
      //   subject: "Food",
      //   subtopics: "",
      //   searchWords: "Fast Food",
      //   streetAndNum: "",
      //   city: "",
      //   zip: "",
      //   bizPhone: ""
      // },
      username: "",
      bizName: "",
      image: "",
      bizLogo: "",
      heading: "",
      couponDesc: "",
      restrictions: [{ restriction: "", key: 0 }],
      subject: "Food",
      subtopics: "",
      searchWords: "Fast Food",
      streetAndNum: "",
      city: "",
      zip: "",
      bizPhone: "",
      restrictionsTotal: 1
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
      if (c.subject === this.state.subject) {
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

  handleRestrictions = () => {
    let inputs = [];
    for (let i = 0; i < this.state.restrictionsTotal; i++) {
      inputs.push(
        <input
          key={i}
          onChange={e => {
            const v = e.target.value;
            let idx = this.state.restrictions.indexOf(inp => 
              inp.key === 0
            );
            console.log(idx);
            if (idx === -1) {
              console.log("here");
              this.setState({
                restrictions: [
                  ...this.state.restrictions,
                  { restriction: v, key: i }
                ]
              });
            }
            this.state.restrictions.map((res, j) => {
              console.log(`i=${i}  j=${j}  res.key=${res.key}`);
              if (res.key === i) {
                console.log(res);
                const newArray = [
                  ...this.state.restrictions.filter(item => item.key !== i),
                  { restriction: v, key: i }
                ];
                console.log(newArray);
                this.setState({
                  restrictions: newArray
                });
              }
              return true;
            });
          }}
        />
      );
    }
    return inputs;
  };

  handleRestrictionAdded = () => {
    this.setState(prevState => ({
      restrictionsTotal: prevState.restrictionsTotal + 1
    }));
  };

  render() {
    console.log(this.state.restrictions, this.state.restrictionsTotal);
    const {
      username,
      bizName,
      image,
      bizLogo,
      heading,
      couponDesc,
      restrictions,
      searchWords,
      streetAndNum,
      city,
      zip,
      bizPhone
    } = this.state;
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
                    createCoupon({
                      coupons: {
                        username,
                        bizName,
                        image,
                        bizLogo,
                        heading,
                        couponDesc,
                        restrictions,
                        searchWords,
                        streetAndNum,
                        city,
                        zip,
                        bizPhone
                      }
                    });
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
                      this.setState(prevState => ({
                        bizName: { ...prevState, bizName }
                      }));
                      // this.setState({
                      //   bizName: Object.assign({}, bizName)
                      // });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Product Image Link: <br />
                  <input
                    placeholder="http://..."
                    onChange={e => {
                      const image = e.target.value;
                      this.setState({ image });

                      // this.setState({
                      //   image: Object.assign({}, image)
                      // });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Business Logo Link: <br />
                  <input
                    placeholder="http://..."
                    onChange={e => {
                      const bizLogo = e.target.value;
                      this.setState({
                        bizLogo
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
                      const heading = e.target.value;
                      this.setState({
                        heading
                      });
                    }}
                    maxLength="25"
                  />
                  <br />
                  <small className="floatLeftWithPaddingAndPull">
                    {heading.length}/25
                  </small>
                  <small>Get One Free</small>
                </div>
                <div className="margin20bottom">
                  Coupon Description: <br />
                  <input
                    onChange={e => {
                      const couponDesc = e.target.value;
                      this.setState({
                        couponDesc
                      });
                    }}
                  />
                  <br />
                </div>
                <div className="margin20bottom">
                  Restrictions: <br />
                  {this.handleRestrictions()}
                  {/* <input
                    onChange={e => {
                      const restrict = { restrictions: e.target.value };
                      this.setState({
                        coupons: Object.assign(coupons, restrict)
                      });
                    }}
                  /> */}
                  <button
                    className=""
                    onClick={e => {
                      e.preventDefault();
                      this.handleRestrictionAdded();
                    }}
                  >
                    add a restriction
                  </button>
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
                        const streetAndNum = e.target.value;
                        this.setState({
                          streetAndNum
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
                        const city = e.target.value;
                        this.setState({
                          city
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
                        const zip = e.target.value;
                        this.setState({
                          zip
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
                      const phone = e.target.value;
                      this.setState({
                        phone
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
                      const subject = e.target.value;
                      this.setState({
                        subject
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
                      const searchWords = e.target.value;
                      this.setState({
                        searchWords
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
