
export abstract class Serializable<T extends object> {
    fromJSON(json: Object): T {
        let emptyObj : T = this.emptyObj();
        const plainObj: T = Object.assign(emptyObj , json);
        const realTem: T = this.copy(plainObj);
        return realTem
    }

    abstract copy(obj: T ) : T;
    abstract emptyObj() : T;
}