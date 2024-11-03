// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/train004.png";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Register = () => {
  // ** Hooks
  const { skin } = useSkin();
  const navigate = useNavigate(); // Initialize the navigate function

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const handleSignUp = (e) => {
    e.preventDefault();

    // Here, you can implement your sign-up logic (e.g., API call)

    // If the sign-up is successful, navigate to the login page
    navigate("/login");
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          {/* <svg viewBox="0 0 139 95" version="1.1" height="28">
          </svg> */}
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
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Adventure starts here with Mr.Alvin Transit 🚀
            </CardTitle>
            <Form
              className="auth-register-form mt-2"
              onSubmit={handleSignUp} // Update the onSubmit handler
            >
              <div className="mb-1">
                <Label className="form-label" for="register-username">
                  Username
                </Label>
                <Input
                  type="text"
                  id="register-username"
                  placeholder="johndoe"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="register-email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="register-password"
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="terms" />
                <Label className="form-check-label" for="terms">
                  I agree to
                  <a
                    className="ms-25"
                    href="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    privacy policy & terms
                  </a>
                </Label>
              </div>
              <Button color="primary" block>
                Sign up
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
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

          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
