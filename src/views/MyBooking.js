import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";
import axios from "axios";

const MyBooking = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bookings");
        setCustomers(response.data); // Update state with fetched bookings
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings(); // Fetch bookings when component mounts
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings 📋</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Displaying booked customers */}
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Train Booked</th>
              <th>Destination</th>
              <th>Departure Time</th> {/* New header for departure time */}
              <th>Arrival Time</th> {/* New header for arrival time */}
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No customers booked yet.
                </td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.trainBooked}</td>
                  <td>{customer.destination}</td>
                  <td>{customer.departureTime}</td> {/* Display departure time */}
                  <td>{customer.arrivalTime}</td> {/* Display arrival time */}
                  <td>{customer.paymentStatus}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default MyBooking;
