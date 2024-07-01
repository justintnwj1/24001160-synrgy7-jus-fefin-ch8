/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import sortImage from "../../../assets/fi_sort.svg";

export default function LandingPage() {
    const token = localStorage.getItem('token');
    const [dataListCars, setDataListCars] = useState<any[]>([]);
    const [dataListOrders, setDataListOrders] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentSort, setCurrentSort] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<string>('ascending');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
    const [visiblePages, setVisiblePages] = useState<number[]>([]);
    const paginationRange = 5;
    const totalPages = Math.ceil(dataListCars.length / itemsPerPage);

    const [currentSortOrder, setCurrentSortOrder] = useState<string>('');
    const [sortDirectionOrder, setSortDirectionOrder] = useState<string>('ascending');
    const [currentPageOrder, setCurrentPageOrder] = useState<number>(1);
    const itemsPerPageOrder = 10;
    const [visiblePagesOrder, setVisiblePagesOrder] = useState<number[]>([]);
    const paginationRangeOrder = 5;
    const totalPagesOrder = Math.ceil(dataListOrders.length / itemsPerPageOrder);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://convincing-mab-justinganteng-781d7896.koyeb.app/api/v1/all-cars?page=${currentPage}&limit=${itemsPerPage}`, {
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
                setDataListCars(responseData.data);
            } catch (error: any) {
                console.error('Fetch error:', error);
                setError(error.message || 'Failed to fetch data');
            }
        };

        fetchData();
    }, [token, currentPage, itemsPerPage, dataListOrders.length]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://convincing-mab-justinganteng-781d7896.koyeb.app/api/v1/listorder?page=${currentPageOrder}&limit=${itemsPerPageOrder}`, {
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
                setDataListOrders(responseData.data);
            } catch (error: any) {
                console.error('Fetch error:', error);
                setError(error.message || 'Failed to fetch data');
            }
        };

        fetchData();
    }, [token, currentPageOrder, itemsPerPageOrder, dataListOrders.length]);
    useEffect(() => {
        const calculateVisiblePages = () => {
            const totalPagesToShow = Math.min(paginationRange, totalPages);
            let startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
            const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

            if (endPage - startPage + 1 < totalPagesToShow) {
                startPage = Math.max(1, endPage - totalPagesToShow + 1);
            }

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                pages.unshift(-1);
                pages.unshift(1);
            }
            if (endPage < totalPages) {
                pages.push(-1);
                pages.push(totalPages);
            }

            setVisiblePages(pages);
        };

        calculateVisiblePages();
    }, [currentPage, totalPages, paginationRange]);

    useEffect(() => {
        const calculateVisiblePages = () => {
            const totalPagesToShow = Math.min(paginationRangeOrder, totalPagesOrder);
            let startPage = Math.max(1, currentPageOrder - Math.floor(totalPagesToShow / 2));
            const endPage = Math.min(totalPagesOrder, startPage + totalPagesToShow - 1);

            if (endPage - startPage + 1 < totalPagesToShow) {
                startPage = Math.max(1, endPage - totalPagesToShow + 1);
            }

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                pages.unshift(-1);
                pages.unshift(1);
            }
            if (endPage < totalPagesOrder) {
                pages.push(-1);
                pages.push(totalPagesOrder);
            }

            setVisiblePagesOrder(pages);
        };

        calculateVisiblePages();
    }, [currentPageOrder, totalPagesOrder, paginationRangeOrder]);

    if (error) {
        return <div className="home">Error: {error}</div>;
    }

    const handleSort = (columnName: string) => {
        const newDirection =
            currentSort === columnName && sortDirection === 'ascending' ? 'descending' : 'ascending';
        setSortDirection(newDirection);

        const sortedData = [...dataListCars].sort((a, b) => {
            if (columnName === 'name' || columnName === 'category') {
                const nameA = a[columnName].toUpperCase();
                const nameB = b[columnName].toUpperCase();
                return newDirection === 'ascending' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            } else if (columnName === 'price') {
                return newDirection === 'ascending' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
            } else if (columnName === 'start_date' || columnName === 'end_date' || columnName === 'createdAt' || columnName === 'updatedAt') {
                return newDirection === 'ascending' ? new Date(a[columnName]).getTime() - new Date(b[columnName]).getTime() : new Date(b[columnName]).getTime() - new Date(a[columnName]).getTime();
            } else {
                return 0;
            }
        });

        setDataListCars(sortedData);
        setCurrentSort(columnName);
    };

    const handleSortOrder = (columnName: string) => {
        const newDirection =
            currentSortOrder === columnName && sortDirectionOrder === 'ascending' ? 'descending' : 'ascending';
        setSortDirectionOrder(newDirection);

        const sortedData = [...dataListOrders].sort((a, b) => {
            if (columnName === 'email' || columnName === 'car') {
                const nameA = a[columnName].toUpperCase();
                const nameB = b[columnName].toUpperCase();
                return newDirection === 'ascending' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            } else if (columnName === 'price') {
                return newDirection === 'ascending' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
            } else if (columnName === 'startrent' || columnName === 'finishrent' || columnName === 'createdAt' || columnName === 'updatedAt') {
                return newDirection === 'ascending' ? new Date(a[columnName]).getTime() - new Date(b[columnName]).getTime() : new Date(b[columnName]).getTime() - new Date(a[columnName]).getTime();
            } else {
                return 0;
            }
        });

        setDataListOrders(sortedData);
        setCurrentSortOrder(columnName);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };
    const goToPageOrder = (page: number) => {
        setCurrentPageOrder(page);
    };

    return (
        <div className="listDashboard">
            <div className="listOrdersTable">
                <div className="titleListOrderTable">
                    <div className="rectangleLOT">

                    </div>
                    <h4 className="font"><strong>List Order</strong></h4>
                </div>
                <div className="dataCars">
                    <table className="tableCars">
                        <thead className="tableCarsHead font">
                            <tr>
                                <th className="tableHeadNo">No</th>
                                <th onClick={() => handleSortOrder('email')} className="sortableHeader">
                                    User Email
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSortOrder('car')} className="sortableHeader">
                                    Car
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSortOrder('startrent')} className="sortableHeader">
                                    Start Rent
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSortOrder('finishrent')} className="sortableHeader">
                                    Finish Rent
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSortOrder('price')} className="sortableHeader">
                                    Price
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSortOrder('status')} className="sortableHeader">
                                    Status
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tableCarsBody font">
                            {dataListOrders.slice((currentPageOrder - 1) * itemsPerPageOrder, currentPageOrder * itemsPerPageOrder).map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.email}</td>
                                    <td>{order.car}</td>
                                    <td>{order.startrent}</td>
                                    <td>{order.finishrent}</td>
                                    <td>{order.price}</td>
                                    <td>{order.status ? 'Availabale' : 'Not Available'}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPageOrder === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPageOrder(currentPageOrder - 1)} disabled={currentPageOrder === 1}>&laquo;</button>
                            </li>
                            {visiblePagesOrder.map((page, index) => (
                                <React.Fragment key={index}>
                                    {page === -1 ? (
                                        <li className="page-item disabled">
                                            <span className="page-link">...</span>
                                        </li>
                                    ) : (
                                        <li className={`page-item ${page === currentPageOrder ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => goToPageOrder(page)}>{page}</button>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                            <li className={`page-item ${currentPageOrder === totalPagesOrder ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPageOrder(currentPageOrder + 1)} disabled={currentPageOrder === totalPagesOrder}>&raquo;</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="listCarsTable">
                <div className="titleListCarsTable">
                    <div className="rectangleLOT">

                    </div>
                    <h4 className="font"><strong>List Car</strong></h4>
                </div>
                <div className="dataCars">
                    <table className="tableCars">
                        <thead className="tableCarsHead font">
                            <tr>
                                <th className="tableHeadNo">No</th>
                                <th onClick={() => handleSort('name')} className="sortableHeader">
                                    Name
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSort('category')} className="sortableHeader">
                                    Category
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSort('price')} className="sortableHeader">
                                    Price
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSort('start_date')} className="sortableHeader">
                                    Start Rent
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSort('end_date')} className="sortableHeader">
                                    Finish Rent
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSort('createdAt')} className="sortableHeader">
                                    Created at
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                                <th onClick={() => handleSort('updatedAt')} className="sortableHeader">
                                    Updated at
                                    <img src={sortImage} alt="Sort Icon" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tableCarsBody font">
                            {dataListCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((car, index) => (
                                <tr key={car.id}>
                                    <td>{index + 1}</td>
                                    <td>{car.name}</td>
                                    <td>{car.category}</td>
                                    <td>{car.price}</td>
                                    <td>{car.start_date}</td>
                                    <td>{car.end_date}</td>
                                    <td>{car.createdAt}</td>
                                    <td>{car.updatedAt}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
                            </li>
                            {visiblePages.map((page, index) => (
                                <React.Fragment key={index}>
                                    {page === -1 ? (
                                        <li className="page-item disabled">
                                            <span className="page-link">...</span>
                                        </li>
                                    ) : (
                                        <li className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => goToPage(page)}>{page}</button>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}