/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import TypeChecker = require("./../tools/TypeChecker");
import UserBusiness = require("../app/business/UserBusiness");
import RoomBusiness = require("../app/business/RoomBusiness");
import TagBusiness = require("../app/business/TagBusiness");
import PlaylistBusiness = require("../app/business/PlaylistBusiness");
import {User} from "../app/model/postgres/User"
import {Room} from "../app/model/postgres/Room"
import {Tag} from "../app/model/postgres/Tag"
import {Event} from "../app/model/postgres/Event"
import {UserGroup} from "../app/model/postgres/UserGroup"
import {Playlist} from "../app/model/postgres/Playlist"
import {PlaylistType} from "../app/model/postgres/PlaylistType"
import {RoomPlaylist} from "../app/model/postgres/RoomPlaylist"
import EventBusiness = require("../app/business/EventBusiness");
import RoomTemplateBusiness = require("../app/business/RoomTemplateBusiness");
import {RoomTemplate} from "../app/model/postgres/RoomTemplate";


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
        try {

            new UserBusiness().findByLogin(res.locals.userToken.login, (error, result) => {
                if (error) {
                    logger.warn("RoomController.getRoomDetails -> findByLogin : error", error);
                }
                else {
                    new RoomBusiness().findByUserId(result[0].id, (error, result) => {
                        if (error) {
                            logger.warn("RoomController.getRooms -> findById : error", error);
                            res.status(400).send({"result": "Bad Request"});
                        }
                        else {

                            var rooms = [];

                            // for (var i = 0; i < result.length; i++) {
                            //     var object = {};
                            //     object["id"] = result[i].id;
                            //     object["name"] = result[i].name;
                            //     object["description"] = result[i].description;
                            //     rooms.push(object);
                            // }

                            res.json(rooms);
                        }
                    });
                }
            });
        }
        catch (e)  {
            logger.error("RoomController.getRooms : error", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show room research result
    search(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Show room detail
    getRoomDetails(req: express.Request, res: express.Response): void {
        try
        {
            let user: User;
            let room: Room = null;
            let events: Event[];
            let roomTemplate: RoomTemplate;
            let playlistsResponse = [];
            let eventsResponse = [];
            let usersResponse = [];
            let tagResponse = "";

            let response = {};

                new UserBusiness().findByLogin(res.locals.userToken.login, (error, result) => {
                    if (error) {
                        logger.warn("RoomController.getRoomDetails -> findByLogin : error", error);
                    }
                    else
                    {
                        user = result;

                        new RoomBusiness().findByUserId(user.id, (error, result) => {
                            if (error) {
                                logger.warn("RoomController.getRoomDetails -> room findByUserId : error", error);
                            }
                            else
                            {
                                for(let i = 0; i < result.length; i++)
                                {
                                    if(result[i].active)
                                    {
                                        room = result[i];
                                    }
                                }

                                if(room == null)
                                {
                                    logger.warn("RoomController.getRoomDetails -> Aucune room n'est active pour cet utilisateur : user", user);
                                    res.status(400).send({"result": "Bad Request"});
                                }

                                new RoomTemplateBusiness().findByUserId(user.id, (error, result) => {
                                    if (error)
                                    {
                                        logger.warn("RoomController.getRoomDetails -> roomTemplate findByUserId : error", error);
                                    }
                                    else
                                    {
                                        roomTemplate = result;
                                        events = result.events;

                                        for(let i = 0; i < roomTemplate.tags.length; i++)
                                        {
                                            tagResponse += roomTemplate.tags[i].label + ' ';
                                        }

                                        for(let i = 0; i < room.tags.length; i++)
                                        {
                                            tagResponse += room.tags[i].label + ' ';
                                        }

                                        for(let i = 0; i < room.roomPlaylists.length; i++)
                                        {
                                            let playlist = {};
                                            playlist["id"] = room.roomPlaylists[i].playlist.id;
                                            playlist["name"] = room.roomPlaylists[i].playlist.name;
                                            playlist["description"] = room.roomPlaylists[i].playlist.description;
                                            playlist["type"] = room.roomPlaylists[i].playlistType.label;

                                            playlistsResponse.push(playlist);
                                        }

                                        for(let i = 0; i < events.length; i++)
                                        {
                                            let event = {};
                                            event["id"] = events[i].id;
                                            event["name"] = events[i].name;
                                            event["description"] = events[i].description;
                                            event["date"] = events[i].eventDate;

                                            eventsResponse.push(event);
                                        }

                                        for(let i = 0; i < room.roomUsers.length; i++)
                                        {
                                            let user = {};
                                            user["id"] = room.roomUsers[i].user.id;
                                            user["name"] = room.roomUsers[i].user.firstName + ' ' + room.roomUsers[i].user.lastName;
                                            user["firstVisit"] = room.roomUsers[i].firstvisit;
                                            user["lastVisit"] = room.roomUsers[i].lastvisit;

                                            usersResponse.push(user);
                                        }

                                        tagResponse = tagResponse.substring(0, tagResponse.length-1);

                                        response["id"] = room.id;
                                        response["name"] = room.label;
                                        response["description"] = roomTemplate.description + " - " + room.description;
                                        response["tags"] = tagResponse;
                                        response["playlists"] = playlistsResponse;
                                        response["events"] = eventsResponse;
                                        response["users"] = usersResponse;

                                        res.status(200).send(response);
                                    }
                                });

                            }
                        });
                    }
                });
        }
        catch (e)  {
            logger.error("RoomController.getRoomDetails : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show room playlist
    getRoomPlaylist(req: express.Request, res: express.Response): void {

        if (TypeChecker.isNumber(req.params._roomId) == false)
        {
            logger.warn("getRoomPlaylist : error", {"error": new Error("Invalid body. Found : " + typeof req.params)});
            res.status(400).send({"result": "Bad Request"});
        }

        let roomId = req.params._roomId;
        let playlist : Playlist = null;
        let room : Room;

        let RB = new RoomBusiness();

        RB.findHydratedById(roomId,(error, result) => {
            if (error) {
                logger.warn("RoomController.getRoomPlaylist -> room findHydratedById : error", error);
                res.status(400).send({"result": "Bad Request"});
            }
            else
            {
                room = result;

                new PlaylistBusiness().getPlaylistTypeById(1, (error, result) => {
                    if (error) {
                        logger.warn("RoomController.getRoomPlaylist -> getPlaylistTypeById : error", error);
                        res.status(400).send({"result": "Bad Request"});
                    }
                    else
                    {
                        console.log(room);

                        for (let i = 0; i < room.roomPlaylists.length; i++) {
                            if (room.roomPlaylists[i].playlistType.id == result.id) {
                                playlist = room.roomPlaylists[i].playlist;
                            }
                        }

                        if (playlist == null) {
                            logger.warn("RoomController.getRoomPlaylist -> getPlaylistTypeById playlist == null : error", error);
                            res.status(400).send({"result": "Bad Request"});
                        }

                        res.status(200).send(playlist);
                    }
                });
            }
        });
    }

    getTemplateEditionView(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Show song submission view
    getSongSubmissionView(req: express.Request, res: express.Response): void {
        //TODO
    }
    
    //Create a song submission
    submitSong(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Create a room
    create(req: express.Request, res: express.Response): void {
        
        if (TypeChecker.isString(req.body.description) == false
            || TypeChecker.isString(req.body.tags) == false 
            || TypeChecker.isArray(req.body.playlists) == false 
            )
        {
            logger.warn("RoomController -> create : error", {"error": new Error("Invalid body. Found : " + typeof req.body)});
            res.status(400).send({"result": "Bad Request"});
        }
        else
        {
            let TB : TagBusiness = new TagBusiness();
            let RB : RoomBusiness = new RoomBusiness();
            let UB : UserBusiness = new UserBusiness();
            let PB : PlaylistBusiness = new PlaylistBusiness();

            // Event to save
            let newRoom: Room = new Room();


            // Get current user
            UB.findCompleteByLogin(res.locals.userToken.login, (error, result) => {
                if (error)
                {
                    logger.warn("RoomController -> create : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else if (result == null || result == undefined || !(result instanceof User) || result.userType.id != 2)
                {
                    res.status(403).send({"result": "RoomController -> create : insufficient permissions"});
                }
                else 
                {

                    newRoom.description = req.body.description;
                    newRoom.active = true;
                    newRoom.state = newRoom.active;
                    newRoom.label = result.roomTemplates[0].name + "_" + new Date().getTime();


                    // Default prototype values
                    newRoom.password = '';
                    newRoom.usingValidation = true;

                    let ug = new UserGroup();
                    ug.id = 1;

                    newRoom.userGroup = ug;
                    // end of defaults values

                    newRoom.roomTemplate = result.roomTemplates[0];
                    newRoom.tags = [];
                    RB.desactivateAllRoomByRoomTemplate(result.roomTemplates[0], (error, result) => {
                        if(error)
                        {
                            logger.warn("RoomController -> create : error", {"error": error});
                            res.status(400).send({"result": "Bad Request"});
                        }
                        else
                        {

                            // Room Create
                            RB.create(newRoom, (error, result) => {
                                if (error)
                                {
                                    logger.warn("RoomController -> create : error", {"error": error});
                                    res.status(400).send({"result": "Bad Request"});
                                }
                                else
                                {
                                    // Return created room's id
                                    res.status(200).send({"id": '"' + result.id + '"'})

                                    newRoom = result;

                                    // Init counter to know when all tags are set in newRoom
                                    let remainingTags = req.body.tags.split(' ').length;
                                    
                                    // for each tags to save
                                    req.body.tags.split(' ').forEach((t, i, tags) => {
                                        

                                        if (t != '' && t != ' ') {
                                            // Trying to find existing tag
                                            TB.findByLabel(t, (error, result) => {
                                                if (error)
                                                {   
                                                    // Decrease counter
                                                    remainingTags--;
                                                    logger.warn("RoomController -> create : error", {"error": error});
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
                                                            logger.warn("RoomController -> create : error", {"error": error});
                                                        }
                                                        else
                                                        {
                                                            // Adding tag to room
                                                            newRoom.tags.push(result);

                                                            // Decrease counter
                                                            remainingTags--;
                                                            // If it's the last one, do the update
                                                            if (remainingTags <= 0)
                                                            {
                                                                // update room
                                                                RB.update(newRoom, (error, result) => {
                                                                    if (error)
                                                                    {
                                                                        logger.warn("RoomController -> create : error", {"error": error});
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

                                                    // Adding tag to room
                                                    newRoom.tags.push(result);


                                                    // Decrease counter
                                                    remainingTags--;
                                                    if (remainingTags <= 0)
                                                    {
                                                        // update room
                                                        RB.update(newRoom, (error, result) => {
                                                            if (error)
                                                            {
                                                                logger.warn("RoomController -> create : error", {"error": error});
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
                                            // Decrease counter
                                            remainingTags--;
                                        }
                                    });


                                    
                                    // Playlist linking
                                    req.body.playlists.forEach((p, i, playlists) => {
                                        if(p.id == null || p.id == undefined || p.id < 0
                                        || p.type == null || p.type == undefined || p.typeid < 0)
                                        {
                                            logger.warn("RoomController -> create : error", {"error": new Error("Invalid body.playlists. Found : " + typeof req.body.playlists)});

                                        }
                                        else
                                        {
                                            let newRoomPlaylist = new RoomPlaylist();

                                            // Newly created room is the owner of the relation
                                            newRoomPlaylist.room = newRoom;

                                            // Find Playlist by Id
                                            PB.findById(p.id, (error, result) => {
                                                if(error)
                                                {
                                                    logger.warn("RoomController -> create : error", {"error": error});
                                                }
                                                else if (result == null || result == undefined || !(result instanceof Playlist))
                                                {
                                                    // Playlist doesn't exist, this case should never happen
                                                    logger.warn("RoomController -> create : error", {"error": new Error("innexistent playlist, should never happen")});
                                                }
                                                else
                                                {
                                                    // found playlist added to relation
                                                    newRoomPlaylist.playlist = result;

                                                    PB.getPlaylistTypeByLabel(p.type, (error, result) => {
                                                        if(error)
                                                        {
                                                            logger.warn("RoomController -> create : error", {"error": error});
                                                        }
                                                        else if (result == null || result == undefined || !(result instanceof PlaylistType))
                                                        {
                                                            // PlaylistType doesn't exist, this case should never happen
                                                            logger.warn("RoomController -> create : error", {"error": new Error("innexistent playlist type, should never happen")});
                                                        }
                                                        else
                                                        {
                                                            // found playlistType added to relation
                                                            newRoomPlaylist.playlistType = result;

                                                            // Now object newRoomPlaylist is complete, save it
                                                            RB.addPlaylistToRoom(newRoomPlaylist, (error, result) => {
                                                                if (error)
                                                                {
                                                                    logger.warn("RoomController -> create : error", {"error": error});
                                                                }
                                                                else 
                                                                {
                                                                    // OK
                                                                }
                                                            })
                                                        }
                                                    })
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

    //Update a room
    update(req: express.Request, res: express.Response): void {
        this.create(req, res);
    }

    updateTemplate(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Delete a room
    delete(req: express.Request, res: express.Response): void {

        if (TypeChecker.isNumber(req.params._roomId) == false)
        {
            logger.warn("RoomController -> delete : error", {"error": new Error("Invalid param, expected a number. Found : " + typeof req.params._roomId)});
            res.status(400).send({"result": "Bad Request"});
        }
        else
        {
            let RB: RoomBusiness = new RoomBusiness();
            let roomId: number = req.params._roomId;

            // Retrieve room's details by his id
            RB.findById(roomId, (error: any, result: any) => {

                if (error)
                {
                    logger.warn("RoomController -> delete : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else if (result == null || result == undefined || !(result instanceof Room))
                {
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    RB.delete(result, (error, result) => {
                        if (error)
                        {
                            logger.warn("RoomController -> delete : error", {"error": error});
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
export = RoomController;