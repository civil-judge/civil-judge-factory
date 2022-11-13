import React, { Suspense, useEffect } from "react";

export const OverallReview = (props) => {
  const [rateBox, setRateBox] = React.useState([]);
  const [globalValue, setGlobalValue] = React.useState(0.0);
  const [two, setTwo] = React.useState("");
  const [totalReviews, setTotalReviews] = React.useState(0);

  const [reviews, setReviews] = React.useState(props.reviews);

  useEffect(() => {
    setReviews(props.reviews);
  }, [props.reviews]);

  useEffect(() => {
    let rateBox = Array.from(document.querySelectorAll(".rate-box"));
    setRateBox(rateBox);
    // document.querySelectorAll(".value").forEach((element) => {
    //   element.addEventListener("click", () => {
    //     let target = element.innerHTML;
    //     reviews[target] += 1;
    //     updateValues();
    //   });
    // });
  }, []);

  useEffect(() => {
    updateValues();
  }, [reviews]);

  function updateValues() {
    rateBox.length > 0 &&
      rateBox.forEach((box) => {
        let valueBox = rateBox[rateBox.indexOf(box)].querySelector(".value");
        let countBox = rateBox[rateBox.indexOf(box)].querySelector(".count");
        let progress = rateBox[rateBox.indexOf(box)].querySelector(".progress");
        // console.log(reviews[valueBox.innerHTML]);
        // console.log(valueBox.innerHTML);
        countBox.innerHTML = nFormat(reviews[valueBox.innerHTML]);

        let progressValue = Math.round(
          (reviews[valueBox.innerHTML] / getTotal(reviews)) * 100
        );
        progress.style.width = `${progressValue}%`;
      });
    setTotalReviews(getTotal(reviews));
    finalRating();
  }
  function getTotal(reviews) {
    return Object.values(reviews).reduce((a, b) => a + b);
  }

  function finalRating() {
    let final = Object.entries(reviews)
      .map((val) => val[0] * val[1])
      .reduce((a, b) => a + b);
    // console.log(typeof parseFloat(final / getTotal(reviews)).toFixed(1));
    let ratingValue = nFormat(parseFloat(final / getTotal(reviews)).toFixed(1));
    setGlobalValue(ratingValue);
    setTwo(
      `linear-gradient(to right, #66bb6a ${
        (ratingValue / 5) * 100
      }%, transparent 0%)`
    );
  }

  function nFormat(number) {
    if (number >= 1000 && number < 1000000) {
      return `${number.toString().slice(0, -3)}k`;
    } else if (number >= 1000000 && number < 1000000000) {
      return `${number.toString().slice(0, -6)}m`;
    } else if (number >= 1000000000) {
      return `${number.toString().slice(0, -9)}md`;
    } else if (number === "NaN") {
      return `0.0`;
    } else {
      return number;
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <link rel="stylesheet" type="text/css" href="/css/review.css" />
      <div className="container">
        <div className="chart">
          <div className="rate-box">
            <span className="value">5</span>
            <div className="progress-bar">
              <span className="progress"></span>
            </div>
            <span className="count">{0}</span>
          </div>
          <div className="rate-box">
            <span className="value">4</span>
            <div className="progress-bar">
              <span className="progress"></span>
            </div>
            <span className="count">{0}</span>
          </div>
          <div className="rate-box">
            <span className="value">3</span>
            <div className="progress-bar">
              <span className="progress yellow"></span>
            </div>
            <span className="count">{0}</span>
          </div>
          <div className="rate-box">
            <span className="value">2</span>
            <div className="progress-bar">
              <span className="progress orange"></span>
            </div>
            <span className="count">{0}</span>
          </div>
          <div className="rate-box">
            <span className="value">1</span>
            <div className="progress-bar">
              <span className="progress red"></span>
            </div>
            <span className="count">{0}</span>
          </div>
        </div>
        <div className="global">
          <span className="global-value">{globalValue}</span>
          <div className="rating-icons">
            <span className="one">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </span>
            <span
              className="two"
              style={{
                background: two,
              }}
            >
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </span>
          </div>
          <span className="total-reviews">{totalReviews} reviews</span>
        </div>
      </div>
    </Suspense>
  );
};
