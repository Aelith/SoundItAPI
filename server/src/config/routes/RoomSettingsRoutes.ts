/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import RoomSettingsController = require("./../../controllers/RoomSettingsController");

var router = express.Router();
class RoomSettingsRoutes {
    private _roomSettingsController: RoomSettingsController;

    constructor () {
        this._roomSettingsController = new RoomSettingsController();
    }
    get routes () {
        var controller = this._roomSettingsController;

        //Show room settings edition view
        router.get("/roomSettings/:_roomId/edit", controller.getEditionView);

        //Update a room settings
        router.put("/roomSettings/:_roomId", controller.update);

        return router;
    }
}

Object.seal(RoomSettingsRoutes);
export = RoomSettingsRoutes;