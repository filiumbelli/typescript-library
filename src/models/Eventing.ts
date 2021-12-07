type Callback = () => void;
type Events = { [key: string]: Callback[] } | {};

export class Eventing {

    private eventDelegator: Events = {}

    on(eventName: string, callback: Callback): void {

        // previous events for eventName
        const handler: Callback[] = this.eventDelegator[eventName] || [];

        // add callback to eventName
        handler.push(callback);

        // update main item
        this.eventDelegator[eventName] = handler;
    }
    trigger(eventName: string) {
        // check if any event to trigger exists
        const handler: Callback[] = this.eventDelegator[eventName];
        if (eventName == "" || !handler || handler.length === 0) {
            return;
        }
        handler.forEach(callback => callback());
    }
}