export class JsonOnlyPayload<T> {
    readonly skipObjectMapper = true;
    
    payload: T;

    constructor(obj: T) {
        this.payload = obj;
    }
}