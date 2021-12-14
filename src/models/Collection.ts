import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Events } from "./Model";


export class Collection<T, K> {
    models: T[] = [];
    events: Events = new Eventing();
    constructor(
        public baseURL: string,
        public deserialize: (json: K) => T
    ) { }

    on = this.events.on;
    trigger = this.events.trigger;

    fetch = (): void => {
        axios.get(`${this.baseURL}/`)
            .then((response: AxiosResponse) => {
                response.data
                    .forEach((item: K) => this.models.push(this.deserialize(item)))
            }).then(() => this.trigger("change"))

    }
}