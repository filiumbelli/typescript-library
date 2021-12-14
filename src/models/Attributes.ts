export class Attributes<T> {
    constructor(private data: T) {
        // this.get = this.get.bind(this);
        // this.set = this.set.bind(this);
    }

    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }
    set = (update: T): void => {
        Object.assign(this.data, update);
    }

    getAll = (): T => {
        return this.data;
    }
}

