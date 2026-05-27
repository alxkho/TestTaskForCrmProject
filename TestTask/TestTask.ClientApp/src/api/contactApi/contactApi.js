import {api} from "../api.js";

export const contactApi = {
    getOne() {
        return api.get("/contact/getOne")
    },
    getAll(query) {
        return api.get("/contact/getAll", {params: query})
    },
    create(body) {
        return api.post("/contact/create", body)
    },
    update(body) {
        return api.put("/contact/update", body)
    },
    delete(query) {
        return api.delete("/contact/delete", {params: query})
    }
}