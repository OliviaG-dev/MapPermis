import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddParcours from "./pages/AddParcours/AddParcours";
import ViewParcours from "./pages/ViewParcours/ViewParcours";
import Error404 from "./components/Error404/Error404";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parcours" element={<ViewParcours />} />
        <Route path="/parcours/ajouter" element={<AddParcours />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
