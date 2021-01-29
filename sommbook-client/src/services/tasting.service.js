import http from "../http-prefix";

class TastingSheetDataService {

    getAll(params) {
        return http.get("/tastings", { params });
    };

    get(id) {
        return http.get(`/tastings/${id}`);
    };

    create(data) {
        return http.post("/tastings", data);
    };

    update(id, data) {
        return http.put(`/tastings/${id}`, data);
    };

    delete(id) {
        return http.delete(`/tastings/${id}`);
    };

    deleteAll() {
        return http.delete(`/tastings`);
    };

    findByVarietalContaining(name) {
        return http.get(`/tastings?varietal=${name}`);
    };

};

export default new TastingSheetDataService();