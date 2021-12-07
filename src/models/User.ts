import { usersApi } from "../api/usersApi";
import { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
    id?: number,
    name?: string,
    age?: number
}
type properties = "id" | "name" | "age"
export class User {

    public events: Eventing = new Eventing();
    private sync: Sync = new Sync();

    constructor(private data: UserProps) { }

    get(propName: properties): (number | string) {
        return this.data[propName];
    }
    set(update: UserProps): void {
        console.log(update);
        Object.assign(this.data, update);
        console.log(this);
    }

    async fetch(): Promise<UserProps> {
        const response = await this.sync.fetch(this);
        return response;
    }

    async save(): Promise<void> {
        console.log(this);
        await this.sync.save(this.data);
    }

}
