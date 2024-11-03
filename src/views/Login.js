// ** React Imports
import { useState } from "react"; // Import useState for state management
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/train004.png";
// import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const { skin } = useSkin();
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Handle successful login (you can store token or user info in local storage)
      console.log("Login successful:", response.data);

      // Optionally store the role and userId in local storage or context
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId", response.data.userId);

      // Navigate to the dashboard or other protected route
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.response.data);
      // Show error notification using react-toastify
      toast.error(error.response.data.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          {/* Brand Logo */}
          <h2 className="brand-text text-primary ms-1">Mr.Alvin</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to Mr.Alvin Transit System 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit} // Attach the handleSubmit function
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="Mr.Alvin@example.com"
                  autoFocus
                  value={email} // Set the value from state
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  value={password} // Set the value from state
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                />
              </div>
              <Button color="primary" type="submit" block>
                Sign in
              </Button>
            </Form>

            <div className="text-center mt-3">
            <p>Don't have an account?</p>
              <Link to="/register" className="text-primary">
                Register here
              </Link>
            </div>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button  href="https://www.facebook.com/" color="facebook">
                <Facebook size={14} />
              </Button>
              <Button href="http://www.twitter.com/"color="twitter">
                <Twitter size={14} />
              </Button>
              <Button href="http://www.gmail.com/" color="google">
                <Mail size={14} />
              </Button>
              <Button href="http://www.github.com/" className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
            {/* Add a link to the registration page */}
         

          </Col>
        </Col>
      </Row>
      <ToastContainer /> {/* Add ToastContainer to render notifications */}
    </div>
  );
};

export default Login;
