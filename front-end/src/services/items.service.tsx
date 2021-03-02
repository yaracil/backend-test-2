import {ApiOpenWS, ApiProtectedWS} from "../api/axios";
import {AxiosInstance} from "axios";

class ItemService {
    private http: AxiosInstance | null;

    constructor(token: string | null) {
        this.http = token ? ApiProtectedWS(token, "items") : null;
    }

    getAll() {
        return this.http?.get("/");
    }

    get(id: number) {
        return this.http?.get(`/${id}`);
    }

    create(data: any) {
        return this.http?.post("/", data);
    }

    update(id: number, data: any) {
        return this.http?.patch(`/${id}`, data);
    }

    delete(id: number) {
        return this.http?.delete(`/${id}`);
    }
}

export default ItemService;
