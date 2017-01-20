/**
 * Created by soundit on 18/01/2017.
 */

import express = require("express");
import TestController = require('../../controllers/TestController')

var router = express.Router();
class TestRoutes {
    private _testController: TestController;

    constructor () {
        this._testController = new TestController();
    }
    get routes () {
        var controller = this._testController;

        router.get("/test", controller.retrieve);
        router.post("/test", controller.create);
        router.put("/test", controller.update);
        router.get("/test/:_id", controller.findById);
        router.delete("/test/:_id", controller.delete);

        return router;
    }


}

Object.seal(TestRoutes);
export = TestRoutes;