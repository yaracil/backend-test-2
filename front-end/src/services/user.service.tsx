import {ApiOpenWS, ApiProtectedWS} from "../api/axios";
import {AxiosInstance} from "axios";

class UserService {
    private http: AxiosInstance | null;
    private httpOpen: AxiosInstance;

    constructor(token: string | null) {
        this.http = token ? ApiProtectedWS(token, "users") : null;
        this.httpOpen = ApiOpenWS("users");
    }

    getAll() {
        return this.http?.get("/");
    }

    get(id: number) {
        return this.http?.get(`/${id}`);
    }

    create(data: any) {
        return this.httpOpen?.post("/register", data);
    }

    update(id: number, data: string) {
        return this.http?.put(`/${id}`, data);
    }

    delete(id: number) {
        return this.http?.delete(`/${id}`);
    }

    forgotPasswordConfirm(data: { newPassword: string | undefined; email: string | undefined; token: string | null }) {
        return this.httpOpen.post("/forgot-password/confirm", data);
    }
}

export default UserService;
