import React, { useState, useEffect } from "react";
import TastingSheetDataService from '../services/tasting.service';
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const TastingsList = () => {

    const [tastings, setTastings] = useState([]);
    const [currentTasting, setCurrentTasting] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const getRequestParams = (searchName, page, pageSize) => {
        let params = {};

        if (searchName) {
            params["varietal"] = searchName;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const retrieveTastings = () => {
        const params = getRequestParams(searchName, page, pageSize);

        TastingSheetDataService.getAll(params)
            .then((response) => {
                const { tastings, totalPages } = response.data;

                setTastings(tastings);
                setCount(totalPages);

                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(retrieveTastings, [page, pageSize]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };


    const refreshList = () => {
        retrieveTastings();
        setCurrentTasting(null);
        setCurrentIndex(-1);
    };

    const setActiveTasting = (tasting, index) => {
        setCurrentTasting(tasting);
        setCurrentIndex(index);
    };

    const removeAllTastings = () => {
        TastingSheetDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        TastingSheetDataService.findByVarietalContaining(searchName)
            .then(response => {
                setTastings(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Varietal"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={retrieveTastings}
                        >
                            Search
            </button>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <h4>Tastings List</h4>

                <div className="mt-3">
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                    />
                </div>

                <ul className="list-group">
                    {tastings &&
                        tastings.map((tasting, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTasting(tasting, index)}
                                key={index}
                            >
                                {tasting.varietal},  By:{tasting.vintner} - {tasting.vintage}
                            </li>
                        ))}
                </ul>
                {/* <button className="m-3 btn btn-sm btn-danger" onClick={removeAllTastings}>
                Remove All
                </button> */}

            </div>
            <div className="col-md-6">
                {currentTasting ? (
                    <div>
                        <h4>Tasting Specifications:</h4>
                        <div>
                            <label>
                                <strong>Varietal:</strong>
                            </label>{" "}
                            {currentTasting.varietal}
                        </div>
                        <div>
                            <label>
                                <strong>Vintner:</strong>
                            </label>{" "}
                            {currentTasting.vintner}
                        </div>
                        <div>
                            <label>
                                <strong>Vintage:</strong>
                            </label>{" "}
                            {currentTasting.vintage}
                        </div>
                        <div>
                            <label>
                                <strong>Country:</strong>
                            </label>{" "}
                            {currentTasting.dueDate}
                        </div>
                        <div>
                            <label>
                                <strong>Rating:</strong>
                            </label>{" "}
                            {currentTasting.rating}
                        </div>
                        <div>
                            <label>
                                <strong>Review:</strong>
                            </label>{" "}
                            {currentTasting.review}
                        </div>

                        <Link
                            to={"/tastings/" + currentTasting.id}
                            className="badge badge-warning"
                        >
                            Edit
            </Link>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Select A Tasting</p>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default TastingsList;