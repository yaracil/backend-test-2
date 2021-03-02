import {ApiOpenWS, ApiProtectedWS} from "../api/axios";
import {AxiosInstance} from "axios";

class OrdersService {
    private http: AxiosInstance | null;

    constructor(token: string | null) {
        this.http = token ? ApiProtectedWS(token, "orders") : null;
    }

    getAll() {
        return this.http?.get("/");
    }

    getAllById(idUser: number) {
        return this.http?.get(`/find?idUser=${idUser}`);
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

export default OrdersService;
