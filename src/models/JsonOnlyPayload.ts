export class JsonOnlyPayload<T> {
    payload: T;
    constructor(obj: T) {
        this.payload = obj;
    }
}
