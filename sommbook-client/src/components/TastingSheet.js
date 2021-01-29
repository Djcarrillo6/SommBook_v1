import React, { useState, useEffect } from "react";
import TastingSheetDataService from '../services/tasting.service';

const TastingSheet = props => {

    const initialTastingSheetState = {
        id: null,
        varietal: "",
        vintner: "",
        vintage: "",
        rating: "",
        review: "",
        country: ""
    };

    const [currentTastingSheet, setCurrentTastingSheet] = useState(initialTastingSheetState);
    const [message, setMessage] = useState("");

    const getTastingSheet = id => {
        TastingSheetDataService.get(id)
            .then(response => {
                setCurrentTastingSheet(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTastingSheet(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTastingSheet({
            ...currentTastingSheet,
            [name]: value
        });
    };

    const updateTastingSheet = () => {
        TastingSheetDataService.update(currentTastingSheet.id, currentTastingSheet)
            .then(response => {
                console.log(response.data);
                setMessage("The Tasting Sheet was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTastingSheet = () => {
        TastingSheetDataService.delete(currentTastingSheet.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/tastings");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentTastingSheet ? (
                <div className="edit-form">
                    <h4>Tasting Sheet Info</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="varietal">Varietal</label>
                            <input
                                type="text"
                                className="form-control"
                                id="varietal"
                                required
                                value={currentTastingSheet.varietal}
                                onChange={handleInputChange}
                                name="varietal"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vintner">Vintner</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vintner"
                                required
                                value={currentTastingSheet.vintner}
                                onChange={handleInputChange}
                                name="vintner"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vintage">Vintage</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vintage"
                                required
                                value={currentTastingSheet.vintage}
                                onChange={handleInputChange}
                                name="vintage"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                required
                                value={currentTastingSheet.country}
                                onChange={handleInputChange}
                                name="country"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rating"
                                required
                                value={currentTastingSheet.rating}
                                onChange={handleInputChange}
                                name="rating"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="review">Review</label>
                            <input
                                type="text"
                                className="form-control"
                                id="review"
                                required
                                value={currentTastingSheet.review}
                                onChange={handleInputChange}
                                name="review"
                            />
                        </div>

                    </form>

                    <button className="badge badge-danger mr-2" onClick={deleteTastingSheet}>
                        Delete
            </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateTastingSheet}
                    >
                        Update
            </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Select A Tasting Sheet</p>
                    </div>
                )}
        </div>
    );

};
export default TastingSheet;