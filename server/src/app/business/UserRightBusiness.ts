/**
 * Created by Lakio on 21/01/2017.
 */

import UserRightRepository = require("../repository/postgres/UserRightRepository");
import BaseBusiness = require("./interfaces/BaseBusiness");
import {UserRight} from "../model/postgres/UserRight";

class UserRightBusiness extends BaseBusiness<UserRight> {

    private userRightRepository: UserRightRepository;

    constructor () {
        super(UserRight);
        this.userRightRepository = new UserRightRepository();
    }

}

Object.seal(UserRightBusiness);
export = UserRightBusiness;