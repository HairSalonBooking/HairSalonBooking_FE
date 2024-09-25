import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "@/routers";
// import RegisterForm from "./components/authentication/RegisForm";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    // <RegisterForm />
  );
}

export default App;
