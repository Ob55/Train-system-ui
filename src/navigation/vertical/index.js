import { Mail, Home } from "react-feather";

export default [
  {
    id: "home",
    title: "View Train",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "bookings",
    title: "Bookings",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "booktrain",
    title: "BookTrain",
    icon: <Mail size={20} />,
    navLink: "/booktrain",
  },  
  {
    id: "mybooking",
    title: "Mybooking",
    icon: <Mail size={20} />,
    navLink: "/mybooking",
  }, 
];
