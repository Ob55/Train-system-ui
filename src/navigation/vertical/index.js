import { Mail, Home } from "react-feather";

const showHome = false; 
const showBookings = false; 
const showBookTrain = true; 
const showMyBooking = true; 

const navItems = [
  ...(showHome
    ? [{
        id: "home",
        title: "View Train",
        icon: <Home size={20} />,
        navLink: "/home",
      }]
    : []),
  ...(showBookings
    ? [{
        id: "secondPage",
        title: "Bookings",
        icon: <Mail size={20} />,
        navLink: "/second-page",
      }]
    : []),
  ...(showBookTrain
    ? [{
        id: "booktrain",
        title: "BookTrain",
        icon: <Mail size={20} />,
        navLink: "/booktrain",
      }]
    : []),
  ...(showMyBooking
    ? [{
        id: "mybooking",
        title: "Mybooking",
        icon: <Mail size={20} />,
        navLink: "/mybooking",
      }]
    : []),
];

export default navItems;
