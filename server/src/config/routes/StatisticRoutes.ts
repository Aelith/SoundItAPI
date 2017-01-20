/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import StatisticController = require("./../../controllers/StatisticController");

var router = express.Router();
class StatisticRoutes {
    private _statisticController: StatisticController;

    constructor () {
        this._statisticController = new StatisticController();
    }
    get routes () {
        var controller = this._statisticController;


        //Show statistics
        router.get("/statistics", controller.getStatistics);

        return router;
    }
}

Object.seal(StatisticRoutes);
export = StatisticRoutes;