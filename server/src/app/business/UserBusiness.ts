/**
 * Created by Lakio on 16/01/2017.
 */

import BaseBusiness = require("./interfaces/BaseBusiness");
import {User} from "../model/postgres/User";
import UserRepository = require("../repository/postgres/UserRepository");


class UserBusiness extends BaseBusiness<User> {

    private _userRepository: UserRepository;

    constructor () {
        super(User);
        this._userRepository = new UserRepository();
    }

    create (item: User, callback: (error: any, result: any) => void) {
        this._userRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._userRepository.retrieve(callback);
    }

    update (_item: User, callback: (error: any, result: any) => void) {

        this._userRepository.findById(_item.id, (err, res) => {
            if(err)
                callback(err, res);

            else {
                this._userRepository.update(_item, callback);
            }
        });
    }

    delete(item: User, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: User) => void) {
        this._userRepository.findById(_id, callback);
    }

    getUserSettings (_id: string, callback: (error: any, result: any) => void) {

    }
    findByLogin (login: string, callback: (error: any, result: any) => void) {
        this._userRepository.findByLogin(login, callback);
    }
}


Object.seal(UserBusiness);
export = UserBusiness;