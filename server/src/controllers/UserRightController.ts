/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import UserRightBusiness = require("./../app/business/UserRightBusiness");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");


class UserRightController {

    private userRightBusiness;

    constructor(){
        this.userRightBusiness = new UserRightBusiness();
    }

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
    create(req: express.Request, res: express.Response): void {
        //TODO
        try {

            this.userRightBusiness.create(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("create : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Created", "data": result});
            });
        }
        catch(e) {
            logger.warn("create : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Update a user right
    update(req: express.Request, res: express.Response): void {
        //TODO
        try {

            this.userRightBusiness.update(JSON.parse(req.body), (error, result) => {
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

    //Delete a user right
    delete(req: express.Request, res: express.Response): void {
        try {

            this.userRightBusiness.delete(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("delete : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Deleted", "data": result});
            });
        }
        catch (e)  {
            logger.error("delete : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

}
export = UserRightController;