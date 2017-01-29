/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import RoomController = require("./../../controllers/RoomController");

var router = express.Router();
class RoomTemplateRoutes {
    private roomController: RoomController;

    constructor () {
        this.roomController = new RoomController();
    }
    get routes () {
        var controller = this.roomController;

        //Show room settings edition view
        router.get("/roomSettings/:_roomId/edit", controller.getTemplateEditionView);

        //Update a room settings
        router.put("/roomSettings/:_roomId", controller.updateTemplate);

        return router;
    }
}

Object.seal(RoomTemplateRoutes);
export = RoomTemplateRoutes;