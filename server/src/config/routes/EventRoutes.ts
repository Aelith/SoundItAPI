/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import EventController = require("./../../controllers/EventController");

var router = express.Router();
class EventRoutes {
    private _eventController: EventController;

    constructor () {
        this._eventController = new EventController();
    }
    get routes () {
        var controller = this._eventController;

        //Show events
        router.get("/events", controller.getEvents);
        //Show event detail
        router.get("/event/:_eventId", controller.getEventDetails);
        //Show event edition view
        router.get("/event/:_eventId/edit", controller.getEditionView);
        //Show event creation view
        router.get("/event/create", controller.getCreationView);

        //Create event
        router.post("/event", controller.create);

        //Update an event
        router.put("/event/:_eventId", controller.update);

        //Delete an event
        router.delete("/event/:_eventId", controller.delete);

        return router;
    }
}

Object.seal(EventRoutes);
export = EventRoutes;