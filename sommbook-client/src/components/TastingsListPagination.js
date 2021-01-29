import React, { useState, useEffect, Component } from "react";
import TastingSheetDataService from '../services/tasting.service';
import { Link } from "react-router-dom";

export default class TastingsListPagination extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchVarietal = this.onChangeSearchVarietal.bind(this);
        this.retrieveTastings = this.retrieveTastings.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTasting = this.setActiveTasting.bind(this);
        this.removeAllTastings = this.removeAllTastings.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.state = {
            tastings: [],
            currentTasting: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 3,
        };

        this.pageSizes = [3, 6, 9];
    };

    componentDidMount() {
        this.retrieveTastings();
    }

    onChangeSearchVarietal(e) {
        const searchVarietal = e.target.value;

        this.setState({
            searchVarietal: searchVarietal,
        });
    }

    getRequestParams(searchVarietal, page, pageSize) {
        let params = {};

        if (searchVarietal) {
            params["varietal"] = searchVarietal;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    retrieveTastings() {
        const { searchVarietal, page, pageSize } = this.state;
        const params = this.getRequestParams(searchVarietal, page, pageSize);

        TastingSheetDataService.getAll(params)
            .then((response) => {
                const { tastings, totalPages } = response.data;

                this.setState({
                    tastings: tastings,
                    count: totalPages,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrieveTastings();
            }
        );
    }

    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrieveTastings();
            }
        );
    }
    render() {
        const {
            searchVarietal,
            tastings,
            currentTasting,
            currentIndex,
            page,
            count,
            pageSize,
        } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Varietal"
                            value={searchVarietal}
                            onChange={this.onChangeSearchVarietal}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.retrieveTastings}
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
                        <select onChange={this.handlePageSizeChange} value={pageSize}>
                            {this.pageSizes.map((size) => (
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
                            onChange={this.handlePageChange}
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
    }
};