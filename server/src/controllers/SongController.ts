/**
 * Created by Lakio on 23/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import SongBusiness = require("../app/business/SongBusiness");
import TypeChecker = require("../tools/TypeChecker");
import PlaylistBusiness = require("../app/business/PlaylistBusiness");
import RoomBusiness = require("../app/business/RoomBusiness");
import {Playlist} from "../app/model/postgres/Playlist";
import {Room} from "../app/model/postgres/Room";
import PlaylistSongBusiness = require("../app/business/PlaylistSongBusiness");


class SongController  {

    private songBusiness;
    private roomBusiness;

    constructor(){
        this.songBusiness = new SongBusiness();
        this.roomBusiness = new RoomBusiness();
    }

    getPreview(req: express.Request, res: express.Response): void {
        //TODO

    }

    search(req: express.Request, res: express.Response): void {
        //TODO

    }
    getDetails(req: express.Request, res: express.Response): void {
        //TODO

    }

    getNextSong (req: express.Request, res: express.Response): void {

        if (TypeChecker.isNumber(req.params.roomId) == false)
        {
            logger.warn("getNextSong : error", {"error": new Error("Invalid body. Found : " + typeof req.params)});
            res.status(400).send({"result": "Bad Request"});
        }

        let roomId = req.params.roomId;
        let playlist : Playlist = null;
        let room : Room;

        let RB = new RoomBusiness();

        RB.findHydratedById(roomId,(error, result) => {
            if (error) {
                logger.warn("SongController.getNextSong -> room findHydratedById : error", error);
                res.status(400).send({"result": "Bad Request"});
            }
            else
            {
                room = result;

                new PlaylistBusiness().getPlaylistTypeById(1, (error, result) => {
                    if (error) {
                        logger.warn("SongController.getNextSong -> getPlaylistTypeById : error", error);
                        res.status(400).send({"result": "Bad Request"});
                    }
                    else
                    {
                        for (let i = 0; i < room.roomPlaylists.length; i++)
                        {
                            if (room.roomPlaylists[i].playlistType.id == result.id)
                            {
                                playlist = room.roomPlaylists[i].playlist;
                            }
                        }

                        if (playlist == null)
                        {
                            logger.warn("SongController.getNextSong -> getPlaylistTypeById playlist == null : error", error);
                            res.status(400).send({"result": "Bad Request"});
                        }

                        new PlaylistSongBusiness().getNextSongByWeight(playlist.id,(error, result) => {
                            if (error) {
                                logger.warn("SongController.getNextSong -> getNextSongByWeight : error", error);
                                res.status(400).send({"result": "Bad Request"});
                            }
                            else
                            {
                                let song = {};
                                song["id"] = result.id;
                                song["album"] = result.album;
                                song["duration"] = result.duration;
                                song["stream"] = result.stream;
                                song["title"] = result.title;
                                song["connector"] = result.songSource.label;

                                res.status(200).send(song);
                            }
                        });
                    }
                });
            }
        });
    }
}
export = SongController;
