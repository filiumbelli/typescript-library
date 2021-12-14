import { Attributes } from "./Attributes";
import { Model } from "./Model";
import { Sync } from "./Sync";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

export interface UserProps {
    id?: number,
    name?: string,
    age?: number,
    isAdmin?: boolean
}

const baseURL = "http://localhost:3000/users";

export class User extends Model<UserProps>{
    constructor(attrs: UserProps) {
        super(new Eventing(), new Sync(baseURL), new Attributes(attrs));
    }

    isAdmin = (): boolean => {
        return this.get("isAdmin");
    }
    static buildCollection = (): Collection<User, UserProps> => {
        return new Collection<User, UserProps>(baseURL, (json: UserProps) => new User(json))
    }
}
