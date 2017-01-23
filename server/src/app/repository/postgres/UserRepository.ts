/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {User} from "../../model/postgres/User";


class UserRepository extends BaseRepository<User> {

    constructor() {
        super(User);
    }

}

export = UserRepository;