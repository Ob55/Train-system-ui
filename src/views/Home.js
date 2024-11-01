import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Home = () => {
    const [tableData, setTableData] = useState([]);
    const [modal, setModal] = useState(false);
    const [newTrain, setNewTrain] = useState({
        driverName: "",
        trainName: "",
        trainNumber: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        status: "",
    });

    // Load data from the backend when the component mounts
    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await axios.get("http://localhost:5000/trains");
                setTableData(response.data);
            } catch (error) {
                console.error("Error fetching trains:", error);
            }
        };

        fetchTrains();
    }, []);

    // Toggle modal
    const toggleModal = () => setModal(!modal);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTrain((prev) => ({ ...prev, [name]: value }));
    };

    // Function to add a new train
    const addTrain = async () => {
        if (Object.values(newTrain).some((val) => val === "")) {
            toast.error("Please fill all fields");
            return;
        }
        if (newTrain.trainNumber.length !== 5) {
            toast.error("Train Number must be exactly 5 characters");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/trains", newTrain);
            setTableData((prev) => [...prev, response.data]);
            toast.success("Train added successfully!");
            toggleModal();
            setNewTrain({
                driverName: "",
                trainName: "",
                trainNumber: "",
                destination: "",
                departureTime: "",
                arrivalTime: "",
                status: "",
            });
        } catch (error) {
            toast.error("Error adding train");
            console.error("Error adding train:", error);
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Train Schedule 📅</CardTitle>
                    <Button color="primary" onClick={toggleModal} style={{ float: "right" }}>
                        Add Train
                    </Button>
                </CardHeader>
                <CardBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Driver's Name</th>
                                <th>Train Name</th>
                                <th>Train Number</th>
                                <th>Destination</th>
                                <th>Departure Time</th>
                                <th>Arrival Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.driverName}</td>
                                        <td>{item.trainName}</td>
                                        <td>{item.trainNumber}</td>
                                        <td>{item.destination}</td>
                                        <td>{item.departureTime}</td>
                                        <td>{item.arrivalTime}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

            {/* Modal for Adding Train */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add New Train</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="driverName">Driver's Name</Label>
                            <Input
                                type="text"
                                name="driverName"
                                id="driverName"
                                value={newTrain.driverName}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="trainName">Train Name</Label>
                            <Input
                                type="text"
                                name="trainName"
                                id="trainName"
                                value={newTrain.trainName}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="trainNumber">Train Number</Label>
                            <Input
                                type="text"
                                name="trainNumber"
                                id="trainNumber"
                                value={newTrain.trainNumber}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    // Set input only if it has a maximum of 5 characters
                                    if (value.length <= 5) {
                                        handleInputChange(e);
                                    }
                                }}
                                maxLength="5" // Ensures a maximum of 5 characters
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="destination">Destination</Label>
                            <Input
                                type="text"
                                name="destination"
                                id="destination"
                                value={newTrain.destination}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="departureTime">Departure Time</Label>
                            <Input
                                type="time"
                                name="departureTime"
                                id="departureTime"
                                value={newTrain.departureTime}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="arrivalTime">Arrival Time</Label>
                            <Input
                                type="time"
                                name="arrivalTime"
                                id="arrivalTime"
                                value={newTrain.arrivalTime}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input
                                type="select"
                                name="status"
                                id="status"
                                value={newTrain.status}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Status</option>
                                <option value="On The Way">On the Way</option>
                                <option value="On Time">On Time</option>
                                <option value="Delayed">Delayed</option>
                                <option value="Cancelled">Cancelled</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addTrain}>
                        Add Train
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default Home;
