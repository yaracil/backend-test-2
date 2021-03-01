import {ApiOpenWS, ApiProtectedWS} from "../api/axios";
import {AxiosInstance} from "axios";

class ItemService {
    private http: AxiosInstance | null;
    private httpOpen: AxiosInstance;

    constructor(token: string | null) {
        this.http = token ? ApiProtectedWS(token, "items") : null;
        this.httpOpen = ApiOpenWS("items");
    }

    getAll() {
        // return this.http?.get("/");
        return this.httpOpen?.get("/");
    }

    get(id: number) {
        // return this.http?.get(`/${id}`);
        return this.httpOpen?.get(`/${id}`);
    }

    create(data: any) {
        return this.httpOpen?.post("/", data);
    }

    update(id: number, data: any) {
        // return this.http?.put(`/${id}`, data);
        return this.httpOpen?.patch(`/${id}`, data);
    }

    delete(id: number) {
        return this.httpOpen?.delete(`/${id}`);
        // return this.http?.delete(`/${id}`);
    }
}

export default ItemService;
