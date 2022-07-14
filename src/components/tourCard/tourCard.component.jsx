import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/img/tours/` + tour.imageCover;
  let date = new Date(tour.startDates[0].split("T")[0]);

  return (
    <div className="card">
      <h3 className="card__title">
        <span>{tour.name}</span>
      </h3>
      <div className="card__picture">
        <div className="card__picture-overlay"></div>
        <img
          crossOrigin="anonymous"
          className="card__picture-img"
          src={url}
          alt={tour.name}
        />
      </div>

      <div className="card__description">
        <div className="card__heading">
          {tour.difficulty} {tour.duration}-Day Tour
        </div>
        <div className="card__text">{tour.summary}</div>

        <div className="card__details">
          <div className="card__data">
            <ion-icon name="location-outline"></ion-icon>
            <div className="card__location">
              {tour.startLocation.description}
            </div>
          </div>

          <div className="card__data">
            <ion-icon name="calendar-clear-outline"></ion-icon>
            <div className="card__date">
              {date.toLocaleString("default", { month: "long" })}{" "}
              {date.getFullYear()}
            </div>
          </div>

          <div className="card__data">
            <ion-icon name="flag-outline"></ion-icon>
            <div className="card__stops">
              {tour.locations.length}{" "}
              {tour.locations.length === 1 ? "stop" : "stops"}
            </div>
          </div>

          <div className="card__data">
            <ion-icon name="person-outline"></ion-icon>
            <div className="card__people">{tour.maxGroupSize} people</div>
          </div>
        </div>
      </div>

      <div className="card__footer">
        <div className="card__footer-data">
          <div className="card__price">
            <strong>${tour.price}</strong> per person
          </div>
          <div className="card__rating">
            <strong>{tour.ratingsAverage}</strong> rating (
            {tour.ratingsQuantity})
          </div>
        </div>
        <Link className="card__btn" to={`tour/${tour.slug}`}>
          <div>Details</div>
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
