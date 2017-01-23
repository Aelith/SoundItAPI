/**
 * Created by Lakio on 16/01/2017.
 */


class UserBusiness /*implements IUserBusiness*/ {

    constructor () {

    }

    create (item: string, callback: (error: any, result: any) => void) {

    }

    retrieve (callback: (error: any, result: any) => void) {

    }

    update (_id: string, item: string, callback: (error: any, result: any) => void) {

    }

    delete (_id: string, callback:(error: any, result: any) => void) {

    }

    findById (_id: string, callback: (error: any, result: any) => void) {

    }

    getUserSettings (_id: string, callback: (error: any, result: any) => void) {

    }
}


Object.seal(UserBusiness);
export = UserBusiness;