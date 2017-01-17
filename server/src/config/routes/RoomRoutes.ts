/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import RoomController = require("./../../controllers/RoomController");

var router = express.Router();
class RoomRoutes {
    private _roomController: RoomController;

    constructor () {
        this._roomController = new RoomController();
    }
    get routes () {
        var controller = this._roomController;

        //Show room creation view
        router.get("/room/create", controller.getCreationView);
        //Show submitted songs
        router.get("/submittedSongs/:_roomId", controller.getSubmittedSongs);
        //Show room users
        router.get("/room/:_roomId/users", controller.getUsersInRoom);
        //Show rooms
        router.get("/rooms", controller.getRooms);
        //Show room research result
        router.get("/room/search/:_searchText", controller.search);
        //Show room detail
        router.get("/room/:_roomId", controller.getRoomDetails);
        //Show room playlist
        router.get("/room/:_roomId/playlist", controller.getRoomPlaylist);
        //Show song submission view
        router.get("/room/:_roomId/submittedSongs/create", controller.getSongSubmissionView);

        //Create room
        router.post("/room", controller.create);
        //Create a song submission
        router.post("/room/:_roomId/submittedSongs", controller.submitSong);

        //Update a room
        router.put("/room/:_roomId", controller.update);

        //Delete a playlist
        router.delete("/room/:_roomId", controller.delete);

        return router;
    }
}

Object.seal(RoomRoutes);
export = RoomRoutes;