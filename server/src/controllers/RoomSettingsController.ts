/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import RoomSettingsBusiness = require("../app/business/RoomSettingsBusiness");


class RoomSettingsController {

    private roomSettingsBusiness;

    constructor(){
        this.roomSettingsBusiness = new RoomSettingsBusiness();
    }

    //Show room settings edition view
    getEditionView(): void {
        //TODO
    }

    //Update a room settings
    update(req: express.Request, res: express.Response): void {
        //TODO
        try {

            this.roomSettingsBusiness.update(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("update : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Updated", "data": result});
            });
        }
        catch (e)  {
            logger.error("update : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

}
export = RoomSettingsController;