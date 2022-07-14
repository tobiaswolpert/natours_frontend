import TourList from "../../components/tourList/tourList.component";
import { Fragment } from "react";
import { selectToursIsLoading } from "../../store/tours/tours.selector";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";

const Home = () => {
  const isLoading = useSelector(selectToursIsLoading);

  return <>{isLoading ? <Spinner /> : <TourList />}</>;
};

export default Home;
