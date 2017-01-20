/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
//import UserBusiness = require("./../app/business/UserBusiness");
import IBaseController = require("./interfaces/BaseController");
//import IUserModel = require("../app/model/mongo/interfaces/UserModel");
import logger = require("./../tools/Logger");


class RoomUserRightController /*implements IBaseController <UserBusiness>*/ {

    //Show room's user rights
    getRoomUserRights(): void {
        //TODO
    }

    //Show user right creation view
    getCreationView(): void {
        //TODO
    }

    //Show user right edition view
    getEditionView(): void {
        //TODO
    }

    //Create user right
    create(): void {
        //TODO
    }

    //Update a user right
    update(): void {
        //TODO
    }

    //Delete a user right
    delete(): void {
        //TODO
    }

}
export = RoomUserRightController;