/**
 * Created by Soundit on 16-06-2016.
 */

interface Read<T> {
    retrieve: (callback: (error: any, result: T)=> void)=> void ;
    findById: (_id: number, callback: (error:any, result: T) => void) => void;

}

export = Read;