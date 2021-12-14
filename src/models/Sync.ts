import axios, { AxiosPromise } from "axios";


interface HasId {
    id?: number | string
}

export class Sync<T extends HasId> {
    constructor(public routeUrl: string) {

    }
    fetch = (id: string | number): AxiosPromise => {
        return axios.get(`${this.routeUrl}/${id}`);
    }
    save = (data: T): AxiosPromise => {
        if (typeof data.id === "number" || typeof data.id === "string") {
            return axios.put(`${this.routeUrl}/${data.id}`, data);
        } else {
            return axios.post(`${this.routeUrl}`, data);
        }
    }
}