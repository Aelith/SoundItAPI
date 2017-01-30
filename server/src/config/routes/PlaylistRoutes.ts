/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import PlaylistController = require("./../../controllers/PlaylistController");

var router = express.Router();
class PlaylistRoutes {
    private _playlistController: PlaylistController;

    constructor () {
        this._playlistController = new PlaylistController();
    }

    get routes () {
        var controller = this._playlistController;

        //Show playlist creation view
        router.get("/playlist/create", controller.getCreationView);

        //Show playlist edition view
        router.get("/playlist/:_playlistId/edit", controller.getEditionView);
        //Show playlist rate view
        router.get("/playlist/:_playlistId/rate/create", controller.getRateView);

        //Show playlists unused
        router.get("/playlists/unused", controller.getPlaylistsUnused);

        //Show playlists
        router.get("/playlists", controller.getPlaylists);
        //Show playlist details
        router.get("/playlist/:_playlistId", controller.getPlaylist);

        //Create playlist
        router.post("/playlist", controller.create);
        //Rate a playlist
        router.post("/playlist/:_playlistId/rate", controller.rate);

        //Rate a song playlist
        router.post("/room/rateSong", controller.rateSong);

        //Update a playlist
        router.put("/playlist/:_playlistId", controller.update);

        //Delete a playlist
        router.delete("/playlist/:_playlistId", controller.delete);

        return router;
    }
}

Object.seal(PlaylistRoutes);
export = PlaylistRoutes;