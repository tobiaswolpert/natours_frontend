import Tour from "../../components/tour/tour.component";

const MyTours = () => {
  // 1) Find all bookings by user ID. User ID is stored in details field of logged in user. Have to implement Redux fetching of booked tours.
  // const bookings = await Booking.find({user: req})

  // // 2) Find tours with the returned IDs
  // const tourIds = bookings.map(el => el.tour);
  // const tours = await Tour.find({_id: {$in: tourIds}})

  return <div>My Tours</div>;
};

export default MyTours;
