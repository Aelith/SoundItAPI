/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import PlaylistBusiness = require("../app/business/PlaylistBusiness");
import {Playlist} from "../app/model/postgres/Playlist";
import LoginManager = require("../tools/LoginManager");
import {PlaylistType} from "../app/model/postgres/PlaylistType";
import UserToken = require("../tools/UserToken");
import UserBusiness = require("../app/business/UserBusiness");
import {PlaylistSong} from "../app/model/postgres/PlaylistSong";
import SongRepository = require("../app/repository/postgres/SongRepository");
import PlaylistSongRepository = require("../app/repository/postgres/PlaylistSongRepository");
import SongSourceRepository = require("../app/repository/postgres/SongSourceRepository");
import {SongSource} from "../app/model/postgres/SongSource";
import SongBusiness = require("../app/business/SongBusiness");
import {Song} from "../app/model/postgres/Song";
import SongSourceBusiness = require("../app/business/SongSourceBusiness");
import PlaylistSongBusiness = require("../app/business/PlaylistSongBusiness");


class PlaylistController {

    constructor(){

    }

    //Show playlists
    getPlaylists(req: express.Request, res: express.Response): void {
        try
        {
            LoginManager.decodeToken(req,res, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getPlaylists -> decodeToken : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    if (result != null && result.decoded) {

                        var userToken: UserToken = result;

                        new UserBusiness().findByLogin(userToken.login, (error, result) => {

                            var playlistBusiness = new PlaylistBusiness();

                            playlistBusiness.findByUserId(result[0].id, (error, result) => {
                                if (error) {
                                    logger.warn("PlaylistController.getPlaylists -> findById : error", error);
                                    res.status(400).send({"result": "Bad Request"});
                                }
                                else {

                                    var playlists = [];

                                    for (var i = 0; i < result.length; i++) {
                                        var object = {};
                                        object["id"] = result[i].id;
                                        object["name"] = result[i].name;
                                        object["description"] = result[i].description;
                                        playlists.push(object);
                                    }

                                    res.json(playlists);
                                }
                            });
                        });
                    }
                    else
                    {
                        res.send("Failed authentication")
                    }
                }
            });
        }
        catch (e)  {
            logger.error("PlaylistController.getPlaylists : error", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    /***
     * Return playlist detail to client
     * @param req
     * @param res
     */
    getPlaylist(req: express.Request, res: express.Response): void {
        try
        {
            var _id: number = req.params._playlistId;

            LoginManager.decodeToken(req,res, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getPlaylist -> decodeToken : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    if (result != null && result.decoded) {

                        var userToken: UserToken = result;
                        var playlistBusiness = new PlaylistBusiness();

                        playlistBusiness.findById(_id, (error, result) => {
                            if(error)
                            {
                                logger.warn("PlaylistController.getPlaylist -> findById : error", error);
                                res.status(400).send({"result": "Bad Request"});
                            }
                            else
                            {
                                var object = {};
                                object["id"] = result[0].id;
                                object["name"] = result[0].name;
                                object["description"] = result[0].description;

                                var songs = [];

                                for(var i = 0; i < result[0].playlistSongs.length; i++)
                                {
                                    var song = {};
                                    song["id"] = result[0].playlistSongs[i].song.id;
                                    song["title"] = result[0].playlistSongs[i].song.title;
                                    song["artist"] = result[0].playlistSongs[i].song.artist;
                                    song["duration"] = result[0].playlistSongs[i].song.duration;
                                    song["album"] = result[0].playlistSongs[i].song.album;
                                    song["connector"] = result[0].playlistSongs[i].song.songSource.label;
                                    song["stream"] = result[0].playlistSongs[i].song.stream;
                                    songs.push(song);
                                }

                                object["songs"] = PlaylistController.sortSongByRank(songs,result[0].songRank);

                                res.json(object);
                            }
                        });
                    }
                    else
                    {
                        res.send("Failed authentication")
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
        try
        {
            LoginManager.decodeToken(req,res, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getCreationView -> decodeToken : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    if (result != null && result.decoded) {

                        var playlist = {};

                        playlist["name"] = '';
                        playlist["description"] = '';

                        res.json(playlist);
                    }
                    else
                    {
                        res.send("Failed authentication")
                    }
                }
            });

        }
        catch (e)  {
            logger.error("PlaylistController.getCreationView : error", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show playlist edition view
    getEditionView(req: express.Request, res: express.Response): void {
        try
        {
            var _id: number = req.params._playlistId;

            LoginManager.decodeToken(req,res, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getEditionView -> decodeToken : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    if (result != null && result.decoded) {

                        var playlistBusiness = new PlaylistBusiness();

                        playlistBusiness.findById(_id, (error, result) => {
                            if(error)
                            {
                                logger.warn("PlaylistController.getEditionView -> findById : error", error);
                                res.status(400).send({"result": "Bad Request"});
                            }
                            else
                            {
                                var object = {};
                                object["id"] = result[0].id;
                                object["name"] = result[0].name;
                                object["description"] = result[0].description;

                                res.json(object);
                            }
                        })
                    }
                    else
                    {
                        res.send("Failed authentication")
                    }
                }
            });
        }
        catch (e)  {
            logger.error("PlaylistController.getEditionView catch", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show playlist rate view
    getRateView(req: express.Request, res: express.Response): void {
        //TODO
    }

    //Create playlist
    create(req: express.Request, res: express.Response): void {
        try {

            LoginManager.decodeToken(req, res, (error, result) => {
                if (error) {
                    logger.warn("PlaylistController.create -> decodeToken : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else {
                    if (result != null && result.decoded) {

                        var userToken: UserToken = result;

                        new UserBusiness().findByLogin(userToken.login, (error, result) => {

                            var playlist = new Playlist();
                            var playlistType = new PlaylistType();
                            playlistType.label = "Playlist";
                            playlistType.id = 1;

                            playlist.name = req.body.name;
                            playlist.description = req.body.description;
                            playlist.songRank = '';
                            playlist.playlistType = playlistType;
                            playlist.temporary = false;
                            playlist.user = result[0];

                            new PlaylistBusiness().create(playlist, (error, result) => {
                                if (error) {
                                    logger.warn("PlaylistController.create : error", error);
                                    res.status(400).send({"result": "Bad Request"});
                                }
                                else
                                    res.status(200).send({"result": "Created", "data": result});
                            });
                        });
                    }
                    else
                    {
                        res.send("Failed authentication")
                    }
                }
            });
        }
        catch
            (e) {
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
        try {

            LoginManager.decodeToken(req, res, (error, result) => {
                if (error)
                {
                    logger.warn("PlaylistController.update -> decodeToken : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else {
                    if (result != null && result.decoded)
                    {
                        var userToken: UserToken = result;

                        new UserBusiness().findByLogin(userToken.login, (error, result) => {

                            var playlist = new Playlist();
                            var rank = '';

                            //Création des songs si elles n'existent pas
                            for(var i = 0; i < req.body.songs.length; i++)
                            {
                                rank += '"' + (i+1) + '": "' + req.body.songs[i].id + '", ';

                                var source = new SongSourceBusiness().getSource(req.body.songs[i].connector);

                                new SongBusiness().findByStreamSource(req.body.songs[i].stream, source,(error, result) => {
                                    //Song inexistante donc on la crée
                                    if (error)
                                    {
                                        var song = new Song();

                                        song.title = req.body.songs[i].title;
                                        song.album = req.body.songs[i].album;
                                        song.artist = req.body.songs[i].artist;
                                        song.duration = req.body.songs[i].duration;
                                        song.stream = req.body.songs[i].stream;

                                        new SongSourceBusiness().findById(req.body.songs[i].id,(error, result) => {
                                            if (error)
                                            {
                                                logger.warn("PlaylistController.update -> findById songSource : error", error);
                                            }
                                            else
                                            {
                                                song.songSource = result;
                                            }
                                        });
                                    }
                                });
                            }

                            //Update playlist

                            var playlistType = new PlaylistType();
                            playlistType.label = "Playlist";
                            playlistType.id = 1;

                            playlist.id = req.body.id;
                            playlist.name = req.body.name;
                            playlist.description = req.body.description;
                            playlist.temporary = false;
                            playlist.user = result[0];

                            playlist.playlistType = playlistType;

                            rank = rank.substring(0,rank.length-2);

                            playlist.songRank = '{' + rank + '}';

                            new PlaylistBusiness().update(playlist,(error, result) => {

                                if(error)
                                {
                                    logger.warn("PlaylistController.update -> update playlist : error", error);
                                    res.status(400).send({"result": "Bad Request"});
                                }
                                else
                                {
                                    playlist = result;
                                }
                            });

                            // //Suppression de tous les playlistSongs
                            // new PlaylistSongBusiness().findByPlaylistId(playlist.id, (error, result) => {
                            //
                            //     for (var i = 0; i < result.length; i++)
                            //     {
                            //         new PlaylistSongBusiness().delete(result[i], (error, result) => {
                            //             if(error) {
                            //                 logger.warn("PlaylistController.update -> delete playlistSong : error", error);
                            //             }
                            //         });
                            //     }
                            // });

                            //Création playlistSongs pour les liaisons

                            for(var i = 0; i < req.body.songs.length; i++){

                                var playlistSong = new PlaylistSong();
                                playlistSong.addDate = new Date();
                                playlistSong.playcount = 0;
                                playlistSong.weight = 0;
                                playlistSong.totalweight = 0;
                                playlistSong.pending = false;
                                playlistSong.playlist = playlist;

                                var source = new SongSourceBusiness().getSource(req.body.songs[i].connector);

                                new SongBusiness().findByStreamSource(req.body.songs[i].stream, source,(error, result) => {
                                    if (error)
                                    {
                                        logger.warn("PlaylistController.update -> findByStreamSource playlistSong : error", error);
                                    }
                                    else
                                    {
                                        playlistSong.song = result;

                                        new PlaylistSongBusiness().create(playlistSong,(error, result) => {
                                            if (error) {
                                                logger.warn("PlaylistController.update : playlistSong creation error", error);
                                            }
                                            else
                                            {
                                                console.log(result);
                                            }
                                        });
                                    }
                                });
                            }
                        });

                        res.status(200).send({"result": "Updated"});
                    }
                    else
                    {
                        res.send("Failed authentication")
                    }
                }
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
            LoginManager.decodeToken(req,res, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.delete -> decodeToken : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    if (result != null && result.decoded) {

                        playlistBusiness.findById(req.params._playlistId, (error, result) => {
                            if(error)
                            {
                                logger.warn("PlaylistController.delete -> findById : error", error);
                                res.status(400).send({"result": "Bad Request"});
                            }
                            else
                            {
                                playlistBusiness.delete(result, (error, result) => {
                                    if (error) {
                                        logger.warn("PlaylistController.delete : error", error);
                                        res.status(400).send({"result": "Bad Request"});
                                    }
                                    else
                                        res.status(200).send({"result": "Deleted", "data": result});
                                });
                            }
                        })
                    }
                    else
                    {
                        res.send("Failed authentication")
                    }
                }
            });
        }
        catch (e)  {
            logger.error("PlaylistController.delete : error", e);
            res.status(400).send({"result": "Bad Request"});

        }
    }

    static sortSongByRank(songs,songRank): any{

        var songRankObject = JSON.parse(songRank);
        var songsSorted = [];

        for(var i = 0; i < songs.length; i++)
        {
            for (var key in songRankObject) {

                if (songRankObject.hasOwnProperty(key)) {

                    if(songs[i].id == songRankObject[key])
                    {
                        var index: number = 0;
                        index = +key;
                        index -= 1;

                        songsSorted[index] = songs[i];
                    }
                }
            }
        }

        return songsSorted;
    }

}
export = PlaylistController;