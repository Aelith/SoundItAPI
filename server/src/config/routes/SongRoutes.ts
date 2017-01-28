/**
 * Created by Lakio on 23/01/2017.
 */


import express = require("express");
import SongController = require("./../../controllers/SongController");

var router = express.Router();
class UserRoutes {
    private songController: SongController;

    constructor () {
        this.songController = new SongController();
    }
    get routes () {
        var controller = this.songController;

        //Get song preview
        router.get("/song/{songId}/preview", controller.getPreview);

        //Search for a song
        router.get("/song/search/{researchText}", controller.search);

        //Show song DETAILS
        router.get("/song/{songId}", controller.getDetails);
        //Get room next song
        router.get("/nextSong/{roomId}", controller.getNextSong);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;

