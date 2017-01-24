/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import PlaylistBusiness = require("../app/business/PlaylistBusiness");
import {Playlist} from "../app/model/postgres/Playlist";
import LoginManager = require("../tools/LoginManager");


class PlaylistController {

    // private playlistBusiness : PlaylistBusiness;

    constructor(){
        // this.playlistBusiness = new PlaylistBusiness();
    }

    //Show playlists
    getPlaylists(req: express.Request, res: express.Response): void {
        //TODO
        var playlistBusiness = new PlaylistBusiness();

        try
        {
            playlistBusiness.getPlaylistsWithDetails((error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getPlaylists : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    res.json(JSON.stringify(result));
                }
            });
        }
        catch (e)  {
            logger.error("PlaylistController.getPlaylists : error", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show playlist details
    getPlaylist(req: express.Request, res: express.Response): void {
        //TODO
        try
        {
            var _id: number = req.params._playlistId;

            LoginManager.decodeToken(req,res, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getPlaylist -> findById : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    if (result) {
                        var playlistBusiness = new PlaylistBusiness();
                        playlistBusiness.findById(_id, (error, result) => {
                            if(error)
                            {
                                logger.warn("PlaylistController.getPlaylist -> findById : error", error);
                                res.status(400).send({"result": "Bad Request"});
                            }
                            else
                            {
                                res.json(result);
                            }
                        })
                    }
                    else
                    {
                        res.send("failed authentication")
                    }
                }
            });
        }
        catch (e)  {
            logger.error("PlaylistController.getPlaylist catch", e);
            res.status(400).send({"result": "Bad Request"});
        }

    }

    //Show playlist creation view
    getCreationView(req: express.Request, res: express.Response): void {
        //TODO
        try
        {
            var playlist: Playlist = new Playlist();

            res.json(JSON.stringify(playlist));
        }
        catch (e)  {
            logger.error("PlaylistController.getPlaylist : error", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show playlist edition view
    getEditionView(req: express.Request, res: express.Response): void {
        //TODO
        this.getPlaylist(req,res);
    }

    //Show playlist rate view
    getRateView(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Create playlist
    create(req: express.Request, res: express.Response): void {
        //TODO
        var playlistBusiness = new PlaylistBusiness();

        try {

            playlistBusiness.create(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("PlaylistController.create : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Created", "data": result});
            });
        }
        catch(e) {
            logger.warn("PlaylistController.create : error", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Rate a playlist
    rate(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Update a playlist
    update(req: express.Request, res: express.Response): void {
        //TODO
        var playlistBusiness = new PlaylistBusiness();

        try {

            playlistBusiness.update(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("PlaylistController.update : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Updated", "data": result});
            });
        }
        catch (e)  {
            logger.error("PlaylistController.update : error", e);
            res.status(400).send({"result": "Bad Request"});

        }
    }

    //Delete a playlist
    delete(req: express.Request, res: express.Response): void {
        //TODO
        var playlistBusiness = new PlaylistBusiness();

        try {

            playlistBusiness.delete(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("PlaylistController.delete : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Deleted", "data": result});
            });
        }
        catch (e)  {
            logger.error("PlaylistController.delete : error", e);
            res.status(400).send({"result": "Bad Request"});

        }
    }

}
export = PlaylistController;