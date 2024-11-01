mport { useState } from "react";
import BookTrain from "./BookTrain"; // Ensure this path is correct based on your project structure
import MyBooking from "./MyBooking"; // Ensure this path is correct based on your project structure

const TrainBookingSystem = () => {
  const [bookings, setBookings] = useState([]);

  const handleNewBooking = (newBooking) => {
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  };

  return (
    <div>
      <BookTrain onNewBooking={handleNewBooking} />
      <MyBooking bookings={bookings} /> {/* Pass bookings as prop */}
    </div>
  );
};

export default TrainBookingSystem;
