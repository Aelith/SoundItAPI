/**
 * Created by soundit on 16/01/2017.
 */

class TypeChecker {

    constructor () {

    }

    public static isNumber(a: any) : boolean {
        try {
            a = +a;
            return !isNaN(a);
        }
        catch(e)
        {
            return false;
        }
    }

    public static isString(a: any) : boolean {
        return typeof a === 'string';
    }

    public static isObject(a: any) : boolean {
        return typeof a === 'object';
    }

    public static isFunction(a: any) : boolean {
        return typeof a === 'function';
    }

    public static isDate(a: any) : boolean {
        try {
            a = new Date(a);
            return (a instanceof Date && !isNaN(a.valueOf()));
        }
        catch(e)
        {
            return false;
        }
    }

    public static isCoherentDate(a: any) : boolean {
        try {
            a = new Date(a);
                        
            return (a instanceof Date && !isNaN(a.valueOf()) && (<Date>a).getFullYear() >= 2000 && (<Date>a).getFullYear() < 3000);
        }
        catch(e)
        {
            return false;
        }
    }

}

export = TypeChecker;