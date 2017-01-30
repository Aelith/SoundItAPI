/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import TypeChecker = require("./../tools/TypeChecker");
import EventBusiness = require("../app/business/EventBusiness");
import TagBusiness = require("../app/business/TagBusiness");
import UserBusiness = require("../app/business/UserBusiness");
import {Event} from "../app/model/postgres/Event";
import {User} from "../app/model/postgres/User";
import {Tag} from "../app/model/postgres/Tag";

class EventController {

    private eventBusiness : EventBusiness;

    constructor(){
        this.eventBusiness = new EventBusiness();
    }

    //Show events with owner = current user
    getEvents(req: express.Request, res: express.Response): void {

        // get object User for current user
        new UserBusiness().findByLogin(res.locals.userToken.login, (error: any, result: any) => {
            if (error)
            {
                logger.warn("getEvents : error", {"error": error});
                res.status(400).send({"result": "Bad Request"});
            }
            else if (result == null || result == undefined || !(result instanceof User))
            {
                res.json("[]");
            }
            else
            {
                // Get Events by user
                new EventBusiness().findByUser(result, (error: any, result: any) => {
                    if (error)
                    {
                        logger.warn("getEvents : error", {"error": error});
                        res.status(400).send({"result": "Bad Request"});
                    }
                    else if (result == null || result == undefined)
                    {
                        res.json("[]");
                    }
                    else
                    {
                        try
                        {
                            // build json response
                            let events = [];

                            // Insert JSON child for each event in result
                            (<Array<Event>>result).forEach((ev, i, evArr) => {
                                
                                let event = {};
                                event["id"] = ev.id;
                                event["name"] = ev.name;
                                event["description"] = ev.description;
                                event["date"] = ev.eventDate;
                                event["tags"] = "";

                                ev.tags.forEach((t, i, tags) => {
                                    event["tags"] += t.label + " ";
                                });

                                events.push(event);
                            })

                            // Send response
                            res.json(events);
                        }
                        catch(e)
                        {
                            logger.warn("getEvents : error", {"error": error});
                            res.status(400).send({"result": "Bad Request"});
                        }
                    }
                });
            }
            
        });

        


    }

    // Show all events to come
    getAllEvents(req: express.Request, res: express.Response): void {

        // Retrieve all upcomming events
        new EventBusiness().retrieveAll((error: any, result: any) => {
            if (error)
            {
                logger.warn("getAllEvents : error", {"error": error});
                res.status(400).send({"result": "Bad Request"});
            }
            else if (result == null || result == undefined)
            {
                res.json("[]");
            }
            else
            {
                try
                {
                    // build json response
                    let events = [];

                    // Insert JSON child for each event in result
                    (<Array<Event>>result).forEach((ev, i, evArr) => {
                        
                        let event = {};
                        event["id"] = ev.id;
                        event["name"] = ev.name;
                        event["description"] = ev.description;
                        event["date"] = ev.eventDate;
                        event["tags"] = "";

                        ev.tags.forEach((t, i, tags) => {
                            event["tags"] += t.label + " ";
                        });

                        events.push(event);
                    })

                    // Send response
                    res.json(events);
                }
                catch(e)
                {
                    logger.warn("getAllEvents : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
            }
        });


    }

    //Show event detail
    getEventDetails(req: express.Request, res: express.Response): void {

        if (TypeChecker.isNumber(req.params._eventId) == false)
        {
            logger.warn("getEventDetails : error", {"error": new Error("Invalid param, expected a number. Found : " + typeof req.params._eventId)});
            res.status(400).send({"result": "Bad Request"});
        }
        else
        {
            let eventId: number = req.params._eventId;

            // Retrieve event's details by his id
            new EventBusiness().findById(eventId, (error: any, result: any) => {
                if (error)
                {
                    logger.warn("getEventDetails : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else if (result == null || result == undefined || !(result instanceof Event))
                {
                    res.json([]);
                }
                else
                {
                    // Build JSON response
                    let event = {};
                    event["id"] = result.id;
                    event["name"] = result.name;
                    event["description"] = result.description;
                    event["date"] = result.eventDate;
                    event["tags"] = "";
                    
                    result.tags.forEach((t, i, tags) => {
                        event["tags"] += t.label + " ";
                    });
                    
                    // Send response
                    res.json(event);
                }
            });
        }
    }

    //Show event edition view
    getEditionView(req: express.Request, res: express.Response): void {

        if (TypeChecker.isNumber(req.params._eventId) == false)
        {
            logger.warn("getEditionView : error", {"error": new Error("Invalid param, expected a number. Found : " + typeof req.params._eventId)});
            res.status(400).send({"result": "Bad Request"});
        }
        else
        {
            let eventId: number = req.params._eventId;

            // Retrieve event's details by his id
            new EventBusiness().findById(eventId, (error: any, result: any) => {
                if (error)
                {
                    logger.warn("getEditionView : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else if (result == null || result == undefined || !(result instanceof Event))
                {
                    res.json([]);
                }
                else
                {
                    // Build JSON response
                    let event = {};
                    event["id"] = result.id;
                    event["name"] = result.name;
                    event["description"] = result.description;
                    event["date"] = result.eventDate;
                    event["tags"] = "";
                    
                    result.tags.forEach((t, i, tags) => {
                        event["tags"] += t.label + " ";
                    });
                    
                    // Send response
                    res.json(event);
                }
            });
        }

    }

    //Show event creation view
    getCreationView(req: express.Request, res: express.Response): void {

        // Build JSON response
        let event = {};
        event["name"] = '';
        event["description"] = '';
        event["date"] = new Date();
        event["tags"] = "";
        
        // Send response
        res.json(event);
    }


    //Create event
    create(req: express.Request, res: express.Response): void {

        if (TypeChecker.isString(req.body.name) == false 
            || TypeChecker.isString(req.body.description) == false 
            || TypeChecker.isString(req.body.tags) == false 
            || TypeChecker.isCoherentDate(req.body.date) == false 
            )
        {
            logger.warn("create : error", {"error": new Error("Invalid body. Found : " + typeof req.body)});
            res.status(400).send({"result": "Bad Request"});
        }
        else
        {
            let TB = new TagBusiness();
            let EB = new EventBusiness();
            let UB = new UserBusiness();


            // Event to save
            let newEvent = new Event();

            newEvent.name = req.body.name;
            newEvent.description = req.body.description;
            newEvent.eventDate = new Date(req.body.date);
            newEvent.tags = [];

            // Get current user
            UB.findCompleteByLogin(res.locals.userToken.login, (error, result) => {
                if (error)
                {
                    logger.warn("create event : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else if (result == null || result == undefined || !(result instanceof User) || result.userType.id != 2)
                {
                    res.status(403).send({"result": "create event : insufficient permissions"});
                }
                else 
                {
                    newEvent.roomTemplate = result.roomTemplates[0];

                    // Event Creation
                    EB.create(newEvent, (error, result) => {
                        if (error)
                        {
                            logger.warn("create event : error", {"error": error});;
                            res.status(400).send({"result": "Bad Request"});
                        }
                        else
                        {

                            res.status(200).send({"id": result.id});
                            newEvent = result;


                            // Tags to save
                            req.body.tags.split(' ').forEach((t, i, tags) => {
                                
                                if (t != '' && t != ' ') {
                                    // Trying to find existing tag
                                    TB.findByLabel(t, (error, result) => {
                                        if (error)
                                        {
                                            logger.warn("create event : error", {"error": error});
                                        }
                                        else if (result == null || result == undefined || !(result instanceof Tag))
                                        {
                                            // Tag doesn't exist, we create it
                                            let tag = new Tag();
                                            tag.label = t.toLowerCase();

                                            // Tag creation
                                            TB.create(tag, (error, result) => {
                                                if (error)
                                                {
                                                    logger.warn("create event : error", {"error": error});
                                                }
                                                else
                                                {
                                                    // Adding tag to event
                                                    newEvent.tags.push(result);

                                                    // update event
                                                    EB.update(newEvent, (error, result) => {
                                                        if (error)
                                                        {
                                                            logger.warn("create event : error", {"error": error});
                                                        }
                                                        else
                                                        {
                                                            newEvent = result;
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else
                                        {
                                            // Tag exists
                                            // Adding tag to event
                                            newEvent.tags.push(result);

                                            // update event
                                            EB.update(newEvent, (error, result) => {
                                                if (error)
                                                {
                                                    logger.warn("create event : error", {"error": error});
                                                }
                                                else
                                                {
                                                    newEvent = result;
                                                }
                                            });
                                        }

                                    });
                                }
                            });

                        }
                    });

                }

            });
            
        }
    }

    //Update an event
    update(req: express.Request, res: express.Response): void {

        if (TypeChecker.isString(req.body.name) == false 
            || TypeChecker.isString(req.body.description) == false 
            || TypeChecker.isString(req.body.tags) == false 
            || TypeChecker.isCoherentDate(req.body.date) == false 
            || TypeChecker.isNumber(req.params._eventId) == false
            )
        {
            logger.warn("update : error", {"error": new Error("Invalid body. Found : " + typeof req.body)});
            res.status(400).send({"result": "Bad Request"});
        }
        else
        {
            let TB = new TagBusiness();
            let EB = new EventBusiness();
            let UB = new UserBusiness();


            // Event to save
            let updatedEvent: Event;


            // Get current user
            EB.findById(req.params._eventId, (error, result) => {
                if (error)
                {
                    logger.warn("update event : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else if (result == null || result == undefined || !(result instanceof Event))
                {
                    res.status(403).send({"result": "update event : insufficient permissions"});
                }
                else 
                {
                    updatedEvent = result;

                    updatedEvent.name = req.body.name;
                    updatedEvent.description = req.body.description;
                    updatedEvent.eventDate = new Date(req.body.date);
                    updatedEvent.tags = [];

                    // Event Update
                    EB.update(updatedEvent, (error, result) => {
                        if (error)
                        {
                            logger.warn("update event : error", {"error": error});
                        }
                        else
                        {
                            updatedEvent = result;

                            // Init counter to know when all tags are set in updatedEvent
                            let remaining = req.body.tags.split(' ').length;
                            
                            // for each tags to save
                            req.body.tags.split(' ').forEach((t, i, tags) => {
                                

                                if (t != '' && t != ' ') {
                                    // Trying to find existing tag
                                    TB.findByLabel(t, (error, result) => {
                                        if (error)
                                        {   
                                            // Decrease counter
                                            remaining--;
                                            logger.warn("update event : error", {"error": error});
                                        }
                                        else if (result == null || result == undefined || !(result instanceof Tag))
                                        {
                                            // Tag doesn't exist, we create it
                                            let tag = new Tag();
                                            tag.label = t.toLowerCase();

                                            // Tag creation
                                            TB.create(tag, (error, result) => {
                                                if (error)
                                                {
                                                    logger.warn("update event : error", {"error": error});
                                                }
                                                else
                                                {
                                                    // Adding tag to event
                                                    updatedEvent.tags.push(result);

                                                    // Decrease counter
                                                    remaining--;
                                                    // If it's the last one, do the update
                                                    if (remaining <= 0)
                                                    {
                                                        // update event
                                                        EB.update(updatedEvent, (error, result) => {
                                                            if (error)
                                                            {
                                                                logger.warn("update event : error", {"error": error});
                                                            }
                                                            else
                                                            {
                                                                
                                                            }
                                                        });
                                                    }
                                                    
                                                }
                                            });
                                        }
                                        else
                                        {
                                            // Tag exists

                                            // Adding tag to event
                                            updatedEvent.tags.push(result);


                                            // Decrease counter
                                            remaining--;
                                            if (remaining <= 0)
                                            {
                                                // update event
                                                EB.update(updatedEvent, (error, result) => {
                                                    if (error)
                                                    {
                                                        logger.warn("update event : error", {"error": error});
                                                    }
                                                    else
                                                    {
                                                        //updatedEvent = result;
                                                    }
                                                });
                                            
                                            }
                                        }

                                    });
                                }
                                else
                                {
                                    // Decrease counter
                                    remaining--;
                                }
                            });



                        }
                    });

                    res.status(200).send({"result": "Updated"});
                }

            });
            
        }
    }

    //Delete an event
    delete(req: express.Request, res: express.Response): void {

        if (TypeChecker.isNumber(req.params._eventId) == false)
        {
            logger.warn("getEventDetails : error", {"error": new Error("Invalid param, expected a number. Found : " + typeof req.params._eventId)});
            res.status(400).send({"result": "Bad Request"});
        }
        else
        {
            let EB: EventBusiness = new EventBusiness();
            let eventId: number = req.params._eventId;

            // Retrieve event's details by his id
            EB.findById(eventId, (error: any, result: any) => {
                if (error)
                {
                    logger.warn("getEvents : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else if (result == null || result == undefined || !(result instanceof Event))
                {
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    EB.delete(result, (error, result) => {
                        if (error)
                        {
                            logger.warn("getEvents : error", {"error": error});
                            res.status(400).send({"result": "Bad Request"});
                        }
                        else
                        {
                            res.status(200).send({"result": "Deleted"})
                        }
                    });     
                }
            });
        }

    
    }

}
export = EventController;