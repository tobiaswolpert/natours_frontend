import TourCard from "../tourCard/tourCard.component";
import { useSelector } from "react-redux";
import { selectToursMap } from "../../store/tours/tours.selector";

const TourList = () => {
  const tours = useSelector(selectToursMap);

  return (
    <div className="tourList">
      {tours.map((tour, idx) => (
        <TourCard tour={tour} key={idx} />
      ))}
    </div>
  );
};

export default TourList;
