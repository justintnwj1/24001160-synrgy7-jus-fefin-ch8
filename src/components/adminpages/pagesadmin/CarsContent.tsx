/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import buttonANW from "../../../assets/ButtonANW.svg";
import carBeep from "../../../assets/img-BeepBeep.svg";
import buttonYa from "../../../assets/ButtonYa.svg";
import buttonNo from "../../../assets/ButtonNo.svg";
import buttonDelete from "../../../assets/ButtonDelete.svg";
import buttonEdit from "../../../assets/ButtonEdit.svg";
import clock from "../../../assets/fi_clock.svg";
import key from "../../../assets/fi_key.svg";
import EditCar from "./EditCar";
import AddNewCar from "./AddNewCar";

export default function LandingPage() {
    const token = localStorage.getItem('token');
    const [showAllListCars, setShowAllListCars] = useState(true);
    const [dataListCars, setDataListCars] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [buttonStatus, setButtonStatus] = useState<string>('all');
    const [carNameDelete, setCarNameDelete] = useState<string>('');
    const [carsEdited, setCarsEdited] = useState(false);
    const [carsAddNew, setCarsAddNew] = useState(false);

    const handleNavigate = () => {
        setCarsAddNew(true);
        setShowAllListCars(false);
    };
    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://convincing-mab-justinganteng-781d7896.koyeb.app/api/v1/all-cars`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            const filteredData = responseData.data
            setDataListCars(filteredData);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };



    const handleUpdateCar = async (nameCar: any) => {
        const name = nameCar;
        console.log(name);
        setCarsEdited(true);
        localStorage.setItem("careditname", name);
        setShowAllListCars(false);
    }

    const handleDeleteName = async (namesCar: any) => {
        console.log(namesCar);
        const name = namesCar;
        setCarNameDelete(name);
    };

    const handleDelete = async () => {

        try {
            const response = await fetch(`https://convincing-mab-justinganteng-781d7896.koyeb.app/api/v1/cars/${carNameDelete}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log(`Car with ID ${carNameDelete} successfully deleted.`);
                const updatedDataList = dataListCars.filter((car) => car.name !== carNameDelete);
                setDataListCars(updatedDataList);
                window.location.reload();
            } else {
                console.error(`Failed to delete car with ID ${carNameDelete}.`);
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const handleFilterByType = (type: string) => {
        setSelectedType(type);
        setButtonStatus(type);
    };
    const filteredCars = selectedType === 'all' ?
        dataListCars :
        dataListCars.filter(car => car.category.toLowerCase() === selectedType);
    return (
        <>
            {showAllListCars && (
                <>
                    <div className="titleNavTable">
                        <strong>List Cars</strong>
                        <button className="addNewCar" onClick={handleNavigate}>
                            <img src={buttonANW} alt="Add New Car" />
                        </button>
                    </div>
                    <div className="listCars">
                        <div className="typeMobil font">
                            <button className={`buttonTypeMobil ${buttonStatus === 'all' ? 'active' : ''}`} onClick={() => handleFilterByType('all')}>All</button>
                            <button className={`buttonTypeMobil ${buttonStatus === 'small' ? 'active' : ''}`} onClick={() => handleFilterByType('small')}>Small</button>
                            <button className={`buttonTypeMobil ${buttonStatus === 'medium' ? 'active' : ''}`} onClick={() => handleFilterByType('medium')}>Medium</button>
                            <button className={`buttonTypeMobil ${buttonStatus === 'large' ? 'active' : ''}`} onClick={() => handleFilterByType('large')}>Large</button>
                        </div>
                        <div className="carCardTable">
                            {filteredCars.map((car) => (
                                <div key={car.id} className="carCard font">
                                    <div className="carUploadImage">
                                        <img src={car.image} />
                                    </div>
                                    <div className="carName">
                                        {car.name} / {car.category}
                                    </div>
                                    <div className="carPrice">
                                        Rp {car.price} / hari
                                    </div>
                                    <div className="timeRentCar">
                                        <img src={key} className="keyImage" />
                                        <div className="startRent">
                                            {car.start_date}
                                        </div>
                                        -
                                        <div className="finishRent">
                                            {car.end_date}
                                        </div>
                                    </div>
                                    <div className="updatedCarTime">
                                        <img src={clock} className="clockImage" />
                                        {car.updatedAt}
                                    </div>
                                    <div className="deleteEditCar">
                                        <button type="button" className="deleteCar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleDeleteName(car.name)}>
                                            <img src={buttonDelete} alt="Delete Icon" />
                                        </button>

                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered font">
                                                <div className="modal-content deleteCarCard">
                                                    <img src={carBeep} className="carBeep" />
                                                    <div className="descDeleteCar">
                                                        <h3><strong>Menghapus Data Mobil</strong></h3>
                                                        <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
                                                    </div>
                                                    <div className="buttonYaNo">
                                                        <button type="button" className="btn btn-primary buttonYa" data-bs-dismiss="modal" onClick={handleDelete}>
                                                            <img src={buttonYa} alt="Yes Icon" />
                                                        </button>
                                                        <button type="button" className="btn btn-secondary buttonNo" data-bs-dismiss="modal">
                                                            <img src={buttonNo} alt="No Icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="editCar" onClick={() => handleUpdateCar(car.name)}>
                                            <img src={buttonEdit} alt="Edit Icon" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {carsEdited && (
                <EditCar />
            )}

            {carsAddNew && (
                <AddNewCar />
            )}
        </>
    );
}
