import { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarHeaderAdmin from "./NavbarHeaderAdmin";
import CarsContent from "./CarsContent"
export default function LandingPage() {
    const [showCars] = useState(true);
    const [showCarsListCars, setShowCarsListCars] = useState(false);
    const [isCarsBold, setIsCarsBold] = useState(false);

    const showListCarsBc = () => {
        setShowCarsListCars(true);
        setIsCarsBold(true);
    }
    return (
        <div className="landingPage">
            <NavbarAdmin />
            <div className="navbarDesc">
                <NavbarHeaderAdmin />
                <div className="mainAdmin">
                    <div className="navbarFunctionDesc font">
                        <>
                            <div className="navbarContentTitle">
                                CARS
                            </div>
                            <div className={`navbarContent ${showCarsListCars ? 'activeBc' : ''}`} onClick={showListCarsBc}>
                                List Cars
                            </div>
                        </>
                    </div>
                    <div className="navTable">
                        <ul className="breadcrumb">
                            {showCars && (
                                <li style={{ fontWeight: isCarsBold ? 'bold' : 'normal' }}>Cars</li>
                            )}
                            {showCarsListCars && (
                                <li>&gt; List Cars</li>
                            )}
                        </ul>
                        {showCarsListCars && (
                            <CarsContent />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}