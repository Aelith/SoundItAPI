/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import RoomBusiness = require("../app/business/RoomBusiness");


class RoomController  {

    private roomBusiness;

    constructor(){
        this.roomBusiness = new RoomBusiness();
    }

    //Show room creation view
    getCreationView(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Show submitted songs
    getSubmittedSongs(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Show room users
    getUsersInRoom(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Show rooms
    getRooms(req: express.Request, res: express.Response): void {
        //TODO
        try
        {
            this.roomBusiness.getRoomsWithDetails((error, result) => {
                if(error)
                {
                    logger.warn("getRooms : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    res.json(JSON.stringify(result));
                }
            });
        }
        catch (e)  {
            logger.error("getRooms : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show room research result
    search(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Show room detail
    getRoomDetails(req: express.Request, res: express.Response): void {
        //TODO
        try
        {
            var _id: string = req.params._roomId;

            this.roomBusiness.findById(_id, (error, result) => {
                if(error)
                {
                    logger.warn("getRoomDetails : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    res.json(JSON.stringify(result));
                }
            });
        }
        catch (e)  {
            logger.error("getRoomDetails : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show room playlist
    getRoomPlaylist(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Show song submission view
    getSongSubmissionView(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Create room
    create(req: express.Request, res: express.Response): void {
        //TODO
        try {
            this.roomBusiness.create(JSON.parse(req.body), (error, result) => {
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

    //Create a song submission
    submitSong(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Update a room
    update(req: express.Request, res: express.Response): void {
        //TODO
        try {

            this.roomBusiness.update(JSON.parse(req.body), (error, result) => {
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

    //Delete a playlist
    delete(req: express.Request, res: express.Response): void {
        try {

            this.roomBusiness.delete(JSON.parse(req.body), (error, result) => {
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
export = RoomController;