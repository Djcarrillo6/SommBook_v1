import React, { useState } from "react";
import TastingSheetDataService from '../services/tasting.service';

const AddTastingSheet = () => {

    const initialTastingSheetState = {
        id: null,
        varietal: "",
        vintner: "",
        vintage: "",
        rating: "",
        review: "",
        country: ""
    };

    const [tasting, setTasting] = useState(initialTastingSheetState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTasting({
            ...tasting,
            [name]: value
        });
    };

    const saveTasting = () => {
        var data = {
            varietal: tasting.varietal,
            vintner: tasting.vintner,
            vintage: tasting.vintage,
            rating: tasting.rating,
            review: tasting.review,
            country: tasting.country
        };

        TastingSheetDataService.create(data)
            .then(response => {
                setTasting({
                    id: response.data.id,
                    varietal: response.data.varietal,
                    vintner: response.data.vintner,
                    vintage: response.data.vintage,
                    rating: response.data.rating,
                    review: response.data.review,
                    country: response.data.country
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTasting = () => {
        setTasting(initialTastingSheetState);
        setSubmitted(false);
    };

    // Render 1 of 2 forms; contingent on the value of the 'submitted' boolean. 
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You successfully submitted a new Tasting Sheet!</h4>
                    <button className="btn btn-success" onClick={newTasting}>
                        Add
              </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="varietal">Varietal</label>
                            <input
                                type="text"
                                className="form-control"
                                id="varietal"
                                required
                                value={tasting.varietal}
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
                                value={tasting.vintner}
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
                                value={tasting.vintage}
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
                                value={tasting.country}
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
                                value={tasting.rating}
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
                                value={tasting.review}
                                onChange={handleInputChange}
                                name="review"
                            />
                        </div>

                        <button onClick={saveTasting} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
        </div>
    );
};

export default AddTastingSheet;