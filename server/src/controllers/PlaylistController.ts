/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import PlaylistBusiness = require("../app/business/PlaylistBusiness");
import {Playlist} from "../app/model/postgres/Playlist";


class PlaylistController {

    private playlistBusiness;

    constructor(){
        this.playlistBusiness = new PlaylistBusiness();
    }

    //Show playlists
    getPlaylists(req: express.Request, res: express.Response): void {
        //TODO
        try
        {
            this.playlistBusiness.getPlaylistsWithDetails((error, result) => {
                if(error)
                {
                    logger.warn("getPlaylists : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    res.json(JSON.stringify(result));
                }
            });
        }
        catch (e)  {
            logger.error("getPlaylists : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show playlist details
    getPlaylist(req: express.Request, res: express.Response): void {
        //TODO
        try
        {
            var _id: string = req.params._playlistId;

            this.playlistBusiness.findById(_id, (error, result) => {
                if(error)
                {
                    logger.warn("getPlaylist : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    res.json(JSON.stringify(result));
                }
            });
        }
        catch (e)  {
            logger.error("getPlaylist : error", {"error": e});
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
            logger.error("getPlaylist : error", {"error": e});
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
        try {

            this.playlistBusiness.create(JSON.parse(req.body), (error, result) => {
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

    //Rate a playlist
    rate(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Update a playlist
    update(req: express.Request, res: express.Response): void {
        //TODO
        try {

            this.playlistBusiness.update(JSON.parse(req.body), (error, result) => {
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

            this.playlistBusiness.delete(JSON.parse(req.body), (error, result) => {
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
export = PlaylistController;