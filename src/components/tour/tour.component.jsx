import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import Map from "../map/map.component";
import { useSelector } from "react-redux";
import {
  selectUserIsLoggedIn,
  selectUserToken,
} from "../../store/user/user.selector";
import { bookTour } from "../../utils/stripe";
import { useStripe } from "@stripe/react-stripe-js";

const Tour = ({ data }) => {
  const stripe = useStripe();
  window.scrollTo(0, 0);

  const [reviews, setReviews] = useState();
  const [localLoading, setlocalLoading] = useState(true);
  const stars =
    reviews &&
    reviews.map((element) => {
      let temp = [];
      for (let i = 1; i <= 5; i++) {
        i <= element.rating
          ? temp.push(<ion-icon name="star"></ion-icon>)
          : temp.push(<ion-icon name="star-outline"></ion-icon>);
      }
      return temp;
    });

  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const token = useSelector(selectUserToken);

  useEffect(() => {
    const fetchReview = async (link) => {
      const response = await fetch(link);
      const review = await response.json();
      setReviews(review.data.doc.reviews);
      setlocalLoading(false);
    };
    fetchReview(`${process.env.REACT_APP_BACKEND_URL}/api/v1/tours/${data.id}`);
  }, [data.id]);

  const url = `${process.env.REACT_APP_BACKEND_URL}/img`;
  let date = new Date(data.startDates[0].split("T")[0]);

  const handleClick = async (e) => {
    e.target.textContent = "...Processing";
    const result = await bookTour(data.id, token);

    await stripe.redirectToCheckout({ sessionId: result.session.id });
    e.target.textContent = "Book Tour Now";
  };

  return localLoading ? (
    <Spinner />
  ) : (
    <div className="tour-container">
      <section className="section-two-column">
        <section className="hero">
          <div className="hero__overlay"></div>
          <img
            className="hero__image"
            crossOrigin="anonymous"
            src={url + "/tours/" + data.imageCover}
            alt={data.name}
          />
          <div className="hero__details">
            <div className="hero__name">
              <span>{data.name} Tour</span>
            </div>
            <div className="hero__description">
              <div className="hero__duration">
                <ion-icon name="time-outline"></ion-icon>
                <span>{data.duration} days</span>
              </div>
              <div className="hero__location">
                <ion-icon name="location-outline"></ion-icon>
                <span>{data.startLocation.description}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="left"></div>
        <div className="right"></div>

        <section className="section-details">
          <div className="facts">
            <h3>Quick Facts </h3>
            {/* <div className="tour__facts-data"> */}
            <div className="facts__item">
              <div className="facts__description">
                <ion-icon name="calendar-clear-outline"></ion-icon>
                <span>Next Date</span>
              </div>
              <div className="facts__information">
                {date.toLocaleString("default", { month: "long" })}{" "}
                {date.getFullYear()}
              </div>
            </div>

            <div className="facts__item">
              <div className="facts__description">
                <ion-icon name="trending-up-outline"></ion-icon>
                <span>Difficulty</span>
              </div>
              <div className="facts__information">{data.difficulty}</div>
            </div>

            <div className="facts__item">
              <div className="facts__description">
                <ion-icon name="person-outline"></ion-icon>
                <span>Participants</span>
              </div>
              <div className="facts__information">
                {data.maxGroupSize} People
              </div>
            </div>

            <div className="facts__item">
              <div className="facts__description">
                <ion-icon name="star-outline"></ion-icon>
                <span>Rating</span>
              </div>
              <div className="facts__information">
                {data.ratingsAverage} / {data.ratingsQuantity}
              </div>
            </div>
            {/* </div> */}
          </div>

          <div className="guide">
            <h3>Your tour guides</h3>

            {data.guides.map((element) => {
              return (
                <div className="guide__item">
                  <div className="guide__description">
                    <img
                      className="guide__img"
                      crossOrigin="anonymous"
                      src={url + "/users/" + element.photo}
                      alt={element.name}
                    />
                    <div className="guide__rank">
                      {element.role.split("-").join(" ")}
                    </div>
                  </div>
                  <div className="guide__name">{element.name}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section-about">
          <h3>About {data.name} tour</h3>
          <div>{data.description}</div>
        </section>
      </section>

      <section className="section-gallery">
        {data.images.map((element) => {
          return (
            <img
              crossOrigin="anonymous"
              src={url + "/tours/" + element}
              alt={element.name}
            />
          );
        })}
      </section>

      <section className="section-map">
        <Map locations={data.locations} />
      </section>

      <section className="section-review">
        <div className="review__container">
          {reviews.map((element, idx) => {
            return (
              <div className="review__card">
                <div className="review__person">
                  <img
                    className="review__image"
                    crossOrigin="anonymous"
                    src={url + "/users/" + element.user.photo}
                    alt={"name"}
                  />
                  <div className="review__name">{element.user.name}</div>
                </div>
                <div className="review__text">{element.review}</div>
                <div className="review__stars">{stars[idx]}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__images">
            {data.images.map((element) => {
              return (
                <img
                  crossOrigin="anonymous"
                  src={url + "/tours/" + element}
                  alt={"name"}
                />
              );
            })}
          </div>

          <div className="cta__text">
            <h3>What are you waiting for?</h3>
            <div>
              {data.duration} days. 1 adventure. Infinite memories. Make it
              yours today
            </div>
          </div>
          {isLoggedIn ? (
            <button className="cta__btn" onClick={handleClick}>
              Book Tour Now
            </button>
          ) : (
            <Link to={"/login"}>
              <div className="cta__btn">Login to book tour</div>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tour;
