/**
 * Created by soundit on 17/01/2017.
 */

interface Read<T> {
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: number, callback: (error:any, result: T) => void) => void;
}

export = Read;