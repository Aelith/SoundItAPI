/**
 * Created by Lakio on 23/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import SongBusiness = require("../app/business/SongBusiness");


class SongController  {

    private songBusiness;

    constructor(){
        this.songBusiness = new SongBusiness();
    }

    getPreview(req: express.Request, res: express.Response): void {
        //TODO

    }

    search(req: express.Request, res: express.Response): void {
        //TODO

    }
    getDetails(req: express.Request, res: express.Response): void {
        //TODO

    }

}
export = SongController;
