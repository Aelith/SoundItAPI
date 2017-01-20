/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import DashboardController = require("./../../controllers/DashboardController");

var router = express.Router();
class DashboardRoutes {
    private _dashboardController: DashboardController;

    constructor () {
        this._dashboardController = new DashboardController();
    }
    get routes () {
        var controller = this._dashboardController;


        //Show user dashboard
        router.get("/dashboard", controller.getDashboard);

        return router;
    }
}

Object.seal(DashboardRoutes);
export = DashboardRoutes;