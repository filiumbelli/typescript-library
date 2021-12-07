import { AxiosResponse } from "axios";
import { usersApi } from "../api/usersApi";
import { User, UserProps } from "./User";
export class Sync {
    async fetch(user: User): Promise<UserProps> {
        const response: AxiosResponse = await usersApi.get(`/${user.get("id")}`);
        return response.data;
    }
    async save(data: UserProps): Promise<void> {
        const id = data.id
        if (id && (data.name || data.age)) {
            await usersApi.put(`/${data.id}`, data);
            return;
        }
        if (!id && data.age && data.name) {
            await usersApi.post("", data);
            return;
        }
        return;
    }
}