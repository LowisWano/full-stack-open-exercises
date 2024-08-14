import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/index.css";
import { BrowserRouter as Router, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { NotificationContextProvider } from "./context/notificationContext";
import { UserContextProvider } from "./context/userContext";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserContextProvider>
      
      <App />
     
    </UserContextProvider>
  </Router>
);
