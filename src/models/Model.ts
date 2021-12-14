import { AxiosPromise, AxiosResponse } from "axios";

type Callback = () => void
interface HasId {
    id?: number | string
}
interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    set(attributes: T): void;
    getAll(): T;
}

interface Sync<T> {
    fetch(id: number | string): AxiosPromise;
    save(data: T): AxiosPromise;
}

export interface Events {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}


export class Model<T extends HasId> {

    constructor(
        private events: Events,
        private sync: Sync<T>,
        private attributes: ModelAttributes<T>
    ) { }

    get = this.attributes.get;
    set = this.attributes.set;
    on = this.events.on;
    trigger = this.events.trigger;
    getAll = this.attributes.getAll;


    fetch(): void {
        this.sync.fetch(this.attributes.get("id"))
            .then((response: AxiosResponse) => {
                this.set(response.data);
            })
    }
    save(): AxiosPromise {
        return this.sync.save(this.attributes.getAll());
    }
}