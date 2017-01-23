/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {UserType} from "../../model/postgres/UserType";


class UserTypeRepository extends BaseRepository<UserType> {

    constructor() {
        super(UserType);
    }

}

export = UserTypeRepository;