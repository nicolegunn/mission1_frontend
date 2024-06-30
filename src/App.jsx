import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";

import VehicleIdentifier from "./pages/VehicleIdentifier/VehicleIdentifier.jsx";
import PremiumCalculator from "./pages/PremiumCalculator/PremiumCalculator.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<VehicleIdentifier />} />
        <Route path="/vehicle-identifier" element={<VehicleIdentifier />} />
        <Route path="/premium-calculator" element={<PremiumCalculator />} />
      </Routes>
    </>
  );
}

export default App;
