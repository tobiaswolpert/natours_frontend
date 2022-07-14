export const bookTour = async (tourId, token) => {
  try {
    // 1) Get the checkout session from the API
    const session = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/bookings/checkout-session/${tourId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const result = await session.json();

    return result;
    // 2) Create checkout form + charge credit card
    // await stripe.redirectToCheckout({ sessionId: result.session.id });
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
