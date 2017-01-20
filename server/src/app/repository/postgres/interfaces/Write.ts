/**
 * Created by soundit on 17/01/2017.
 */


interface Write<T> {
    create: (item:T, callback: (error: any, result: any) => void) => void;
    update: (item:T, callback: (error: any, result: any) => void) => void;
    delete: (item:T, callback: (error: any, result: any) => void) => void;
    deleteById: (id:number, callback: (error: any, result: any) => void) => void;

}

export = Write;