import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from 'emailjs-com';

const BookTrain = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    trainBooked: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    paymentStatus: "Pending",
    goods: "", 

  });
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/trains");
        setTrains(response.data);
      } catch (error) {
        console.error("Error fetching trains:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchTrains();
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "trainBooked") {
      const selectedTrain = trains.find((train) => train.trainName === value);
      if (selectedTrain) {
        setFormData((prevData) => ({
          ...prevData,
          destination: selectedTrain.destination,
          departureTime: selectedTrain.departureTime,
          arrivalTime: selectedTrain.arrivalTime,
        }));
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    setSearchQuery("");
    setFormData((prevData) => ({
      ...prevData,
      trainBooked: train.trainName,
      destination: train.destination,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post the booking data
      const response = await axios.post("http://localhost:5000/bookings", formData);
      setBookings((prevBookings) => [...prevBookings, response.data]);
      toast.success("Train booked successfully!");

      // Prepare the template parameters for EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        train: formData.trainBooked,
        destination: formData.destination,
        departure: formData.departureTime,
        arrival: formData.arrivalTime,
        goods: formData.goods || "N/A", // Use "N/A" if goods is empty

      };

      // Send receipt email using EmailJS
      await emailjs.send("service_9somcoo", "template_jqnx3wb", templateParams, "YOUR_USER_ID"); // Replace YOUR_USER_ID
      toast.success("Receipt sent to your email!");

      // Reset form after successful submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        trainBooked: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        paymentStatus: "Pending",
        goods: "",

      });
      setSelectedTrain(null);
    } catch (error) {
      console.error("Error booking train or sending email:", error);
      toast.error("Failed to book train or send receipt. Please try again.");
    }
  };

  const getReceipt = () => {
    const receiptDetails = `
      Receipt:
      - Name: ${formData.name}
      - Train: ${formData.trainBooked}
      - Destination: ${formData.destination}
      - Departure: ${formData.departureTime}
      - Arrival: ${formData.arrivalTime}
      - Payment Status: ${formData.paymentStatus}
    `;
    alert(receiptDetails);
  };

  // Filter trains based on search query
  const filteredTrains = trains.filter((train) =>
    train.trainName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a Train 🚆</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Search Input */}
        <FormGroup>
          <Label for="search">Search for a Train</Label>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Enter train name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </FormGroup>

        {/* Display dropdown for filtered trains */}
        {searchQuery && filteredTrains.length > 0 && (
          <ul className="list-group mb-3">
            {filteredTrains.map((train) => (
              <li
                key={train.trainNumber}
                className="list-group-item"
                onClick={() => handleTrainSelect(train)}
                style={{ cursor: "pointer" }}
              >
                {train.trainName}
              </li>
            ))}
          </ul>
        )}

        {/* Selected Train Details */}
        {selectedTrain && (
          <div className="mb-4 p-3 border border-info rounded d-flex justify-content-between align-items-center">
            <div>
              <h5>Train Details:</h5>
              <p><strong>Name:</strong> {selectedTrain.trainName}</p>
              <p><strong>Destination:</strong> {selectedTrain.destination}</p>
              <p><strong>Departure Time:</strong> {selectedTrain.departureTime}</p>
              <p><strong>Arrival Time:</strong> {selectedTrain.arrivalTime}</p>
            </div>

          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="goods">Send Goods</Label>
            <Input
              type="text"
              name="goods"
              id="goods"
              value={formData.goods}
              onChange={handleChange}
              // required
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="trainBooked">Train</Label>
            <Input
              type="select"
              name="trainBooked"
              id="trainBooked"
              value={formData.trainBooked}
              onChange={handleChange}
              required
            >
              <option value="">Select a train</option>
              {trains.map((train) => (
                <option key={train.trainNumber} value={train.trainName}>
                  {train.trainName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="destination">Destination</Label>
            <Input
              type="text"
              name="destination"
              id="destination"
              value={formData.destination}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="departureTime">Departure Time</Label>
            <Input
              type="text"
              name="departureTime"
              id="departureTime"
              value={formData.departureTime}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="arrivalTime">Arrival Time</Label>
            <Input
              type="text"
              name="arrivalTime"
              id="arrivalTime"
              value={formData.arrivalTime}
              readOnly
            />
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button type="submit" color="primary" className="mb-4">
              Submit
            </Button>
            <Button color="secondary" onClick={getReceipt} className="mb-4">
              Get Receipt
            </Button>
          </div>
        </Form>
      </CardBody>
      <ToastContainer />
    </Card>
  );
};

export default BookTrain;
