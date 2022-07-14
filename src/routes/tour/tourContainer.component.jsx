import { useParams } from "react-router-dom";
import { selectTour } from "../../store/tours/tours.selector";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import Tour from "../../components/tour/tour.component";
import {
  selectToursIsLoading,
  selectToursMap,
} from "../../store/tours/tours.selector";
import { useState } from "react";

const TourContainer = () => {
  const { tourName } = useParams();
  const isLoading = useSelector(selectToursIsLoading);
  const tourItem = useSelector((state) => selectTour(state, tourName));

  return isLoading ? (
    <Spinner />
  ) : (
    tourItem.map((element, idx) => <Tour data={element} key={idx} />)
  );
};

export default TourContainer;
