/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {UserRight} from "../../model/postgres/UserRight";


class UserRightRepository extends BaseRepository<UserRight> {

    constructor() {
        super(UserRight);
    }

}

export = UserRightRepository;