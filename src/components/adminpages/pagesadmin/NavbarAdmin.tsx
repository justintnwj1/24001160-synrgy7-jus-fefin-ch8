import { useState, useEffect } from "react";
import car from "../../../assets/fi_truck.svg";
import dashboard from "../../../assets/fi_home.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavbarAdmin() {
    const [showDashboard, setShowDashboard] = useState(true);
    const [showCars, setShowCars] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/admindashboardtesting") {
            setShowDashboard(true);
            setShowCars(false);
        } else if (location.pathname === "/admincarstesting") {
            setShowDashboard(false);
            setShowCars(true);
        }
    }, [location.pathname]);
    
    const showDashboardContent = () => {
        setShowDashboard(true);
        setShowCars(false);
        navigate("/admindashboardtesting");
    }

    const showCarsContent = () => {
        setShowDashboard(false);
        setShowCars(true);
        navigate("/admincarstesting");
    }

    return (
        <>
            <div className="navbarAdmin">
                <div className="rectangleAdminMini">
                </div>
                <div className={`navbarMenu dashboard ${showDashboard ? 'active' : ''}`} onClick={showDashboardContent}>
                    <img src={dashboard} alt="Dashboard Icon" />
                    <h3>Dashboard</h3>
                </div>
                <div className={`navbarMenu cars ${showCars ? 'active' : ''}`} onClick={showCarsContent}>
                    <img src={car} alt="Car Icon" />
                    <h3>Cars</h3>
                </div>
            </div>
        </>
    );
}
