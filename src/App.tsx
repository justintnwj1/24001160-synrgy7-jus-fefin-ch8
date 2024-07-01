import Layout from "./components/pages/Layout";
import Home from "./components/pages/landingpage/Home";
import OurService from "./components/pages/landingpage/OurService";
import WhyUs from "./components/pages/landingpage/WhyUs";
import Testimony from "./components/pages/landingpage/Testimony";
import RentNow from "./components/pages/landingpage/RentNow";
import Faq from "./components/pages/landingpage/Faq";
import RentCar from "./components/pages/rentcarpage/RentCar";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import AdminLogin from "./components/adminpages/login/AdminLogin";
import DashboardAdmin from "./components/adminpages/pagesadmin/DashboardAdmin";
import CarsAdmin from "./components/adminpages/pagesadmin/CarsAdmin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Layout>
            <Home />
            <OurService />
            <WhyUs />
            <Testimony />
            <RentNow />
            <Faq />
          </Layout>
        </>} />
        <Route path="/getcars" element={<>
          <Layout>
            <Home />
            <RentCar />
          </Layout>
        </>} />
        <Route path="/register" element={<>
          <Register />
        </>} />
        <Route path="/login" element={<>
          <Login />
        </>} />
        <Route path="/adminlogin" element={<>
          <AdminLogin />
        </>} />
        <Route path="/admindashboardtesting" element={<>
          <DashboardAdmin />
        </>} />
        <Route path="/admincarstesting" element={<>
          <CarsAdmin />
        </>} />
      </Routes>
    </Router>
  );
}

export default App;
