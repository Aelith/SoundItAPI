/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {LoginType} from "../../model/postgres/LoginType";


class LoginTypeRepository extends BaseRepository<LoginType> {

    constructor() {
        super(LoginType);
    }

}

export = LoginTypeRepository;