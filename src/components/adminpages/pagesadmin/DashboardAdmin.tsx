import { useState} from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavbarHeaderAdmin from "./NavbarHeaderAdmin";
import DashboardContent from "./DashboardContent";

export default function Dashboard2() {
    const [showDashboard] = useState(true);
    const [showDashboardDashboard, setShowDashboardDashboard] = useState(false);
    const [isDashboardBold, setIsDashboardBold] = useState(false);

    const showDbBc = () => {
        setShowDashboardDashboard(true);
        setIsDashboardBold(true);
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
                                DASHBOARD
                            </div>
                            <div className={`navbarContent ${showDashboardDashboard ? 'activeBc' : ''}`} onClick={showDbBc}>
                                Dashboard
                            </div>
                        </>
                    </div>
                    <div className="navTable">
                        <ul className="breadcrumb">
                            {showDashboard && (
                                <li style={{ fontWeight: isDashboardBold ? 'bold' : 'normal' }}>Dashboard</li>
                            )}
                            {showDashboardDashboard && (
                                <li>&gt; Dashboard</li>
                            )}
                        </ul>
                        {showDashboardDashboard && (
                            <div className="titleNavTable">
                                <strong>Dashboard</strong>
                            </div>
                        )}
                        {showDashboardDashboard && (

                            <DashboardContent />


                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}