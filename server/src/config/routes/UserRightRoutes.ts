/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import RoomUserRightController = require("../../controllers/UserRightController");
import UserRightController = require("../../controllers/UserRightController");

var router = express.Router();
class RoomUserRightRoutes {
    private userRightsController: UserRightController;

    constructor () {
        this.userRightsController = new UserRightController();
    }
    get routes () {
        var controller = this.userRightsController;

        //Show room's user rights
        router.get("/userRights/:_roomId", controller.getRoomUserRights);
        //Show user right creation view
        router.get("/userRight/create", controller.getCreationView);
        //Show user right edition view
        router.get("/userRight/:_roomId/edit", controller.getEditionView);

        //Create user right
        router.post("/userRight", controller.create);

        //Update a user right
        router.put("/userRight/:_roomId", controller.update);

        //Delete a user right
        router.delete("/userRight/:_roomId", controller.delete);

        return router;
    }
}

Object.seal(RoomUserRightRoutes);
export = RoomUserRightRoutes;