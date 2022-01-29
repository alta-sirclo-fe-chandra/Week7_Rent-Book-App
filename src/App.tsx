import { Outlet } from "react-router";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
