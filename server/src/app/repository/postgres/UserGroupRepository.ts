/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {UserGroup} from "../../model/postgres/UserGroup";


class UserGroupRepository extends BaseRepository<UserGroup> {

    constructor() {
        super(UserGroup);
    }

}

export = UserGroupRepository;