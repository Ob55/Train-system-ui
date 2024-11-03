import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";
import axios from "axios";

const SecondPage = () => {
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
        <CardTitle>View Customer Bookings 📋</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Displaying booked customers */}
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Send Goods</th> {/* Existing Send Goods column */}
              <th>Train Booked</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Payment Status</th>
              <th>Track package</th> {/* Added Goods Status column */}
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  No customers booked yet.
                </td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.goods || "N/A"}</td> {/* Display "N/A" if no goods are added */}
                  <td>{customer.trainBooked}</td>
                  <td>{customer.destination}</td>
                  <td>{customer.departureTime}</td>
                  <td>{customer.arrivalTime}</td>
                  <td>{customer.paymentStatus}</td>
                  <td>{customer.goodsStatus || "N/A"}</td> {/* Display "N/A" if no goods status is provided */}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default SecondPage;
