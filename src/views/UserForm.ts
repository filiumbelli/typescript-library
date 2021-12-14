import { User, UserProps } from "../models/User";

export class UserForm {
    constructor(public parent: Element, public model: User) { }

    eventsMap = (): { [key: string]: () => void } => {
        return {
            "click:.set-age": this.onSetAgeClick,
            "change:.age-input": this.onAgeInputChange
        }
    }
    bindEvents = (fragment: DocumentFragment): void => {
        const eventsMap = this.eventsMap();
        for (let key in eventsMap) {
            // eventName = 'click' | selector = 'button'
            const [eventName, selector] = key.split(":");
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[key]);
            });
        }
    }

    onAgeInputChange = (): void => {

    }

    onSetAgeClick = (): void => {
        const attrs: UserProps = this.model.getAll();
        attrs.age = Math.random() * 99
        this.model.set(attrs);
        this.render();
    }

    template = (): string => {
        return `
        <div>
            <h1>Form Header</h1>
            <div>Name: ${this.model.get("name")}</div>
            <div>Age: ${this.model.get("age")}</div>
            <input />
            <button class="set-age">Click</button>
        </div>
        `
    }
    render = (): void => {
        const templateElement = document.createElement("template");
        templateElement.innerHTML += this.template();
        this.bindEvents(templateElement.content);
        this.parent.replaceChildren(templateElement.content);
    }

}