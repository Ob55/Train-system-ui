import React, { Suspense } from "react";
import { ToastContainer } from 'react-toastify';

// ** Router Import
import Router from "./router/Router";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
      <ToastContainer />
    </Suspense>
  );
};

export default App;
