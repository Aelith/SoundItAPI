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
        router.get("/test/h", controller.retrieveHydrated);


        router.get("/test/ab/:_id1/:_id2", controller.findByIds);
        router.get("/test/h/ab/:_id1/:_id2", controller.findHydratedByIds);

        router.get("/test/a/:_id", controller.findById1);
        router.get("/test/b/:_id", controller.findById2);
        router.get("/test/h/a/:_id", controller.findHydratedById1);
        router.get("/test/h/b/:_id", controller.findHydratedById2);


        router.post("/test", controller.create);
        router.put("/test", controller.update);
        router.delete("/test/:_id", controller.delete);

        return router;
    }


}

Object.seal(TestRoutes);
export = TestRoutes;