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
import UserBusiness = require("../app/business/UserBusiness");
import {PlaylistSong} from "../app/model/postgres/PlaylistSong";
import SongRepository = require("../app/repository/postgres/SongRepository");
import PlaylistSongRepository = require("../app/repository/postgres/PlaylistSongRepository");
import SongSourceRepository = require("../app/repository/postgres/SongSourceRepository");
import SongBusiness = require("../app/business/SongBusiness");
import {Song} from "../app/model/postgres/Song";
import SongSourceBusiness = require("../app/business/SongSourceBusiness");
import PlaylistSongBusiness = require("../app/business/PlaylistSongBusiness");
import TypeChecker = require("../tools/TypeChecker");
import RoomBusiness = require("../app/business/RoomBusiness");
import {Room} from "../app/model/postgres/Room";


class PlaylistController {

    constructor(){

    }

    //Show playlists
    getPlaylists(req: express.Request, res: express.Response): void {
        try
        {
            new UserBusiness().findByLogin(res.locals.userToken.login, (error, result) => {

                new PlaylistBusiness().findByUserId(result.id, (error, result) => {
                    if (error) {
                        logger.warn("PlaylistController.getPlaylists -> findById : error", error);
                        res.status(400).send({"result": "Bad Request"});
                    }
                    else
                    {
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
        catch (e)  {
            logger.error("PlaylistController.getPlaylists : error", e);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    getPlaylistsUnused(req: express.Request, res: express.Response): void {
        try
        {
            new UserBusiness().findByLogin(res.locals.userToken.login, (error, result) => {

                new PlaylistBusiness().findUnusedByUserId(result.id, (error, result) => {
                    if (error) {
                        logger.warn("PlaylistController.getPlaylistsUnused -> findUnusedByUserId : error", error);
                        res.status(400).send({"result": "Bad Request"});
                    }
                    else
                    {
                        let playlists = [];

                        for(let i = 0; i < result.length; i++)
                        {
                            let playlist = {};
                            playlist["id"] = result[i].id;
                            playlist["name"] = result[i].name;
                            playlist["description"] = result[i].description;
                            playlists.push(playlist);
                        }

                        res.status(200).send(playlists);
                    }
                });
            });
        }
        catch (e)  {
            logger.error("PlaylistController.getPlaylistsUnused : error", e);
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
            if (TypeChecker.isNumber(req.params._playlistId) == false)
            {
                logger.warn("getPlaylist : error", {"error": new Error("Invalid params. Found : " + typeof req.params)});
                res.status(400).send({"result": "Bad Request"});
            }

            let _id: number = req.params._playlistId;

            new PlaylistBusiness().findById(_id, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getPlaylist -> findById : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    var object = {};
                    object["id"] = result.id;
                    object["name"] = result.name;
                    object["description"] = result.description;

                    var songs = [];

                    for(var i = 0; i < result.playlistSongs.length; i++)
                    {

                        var song = {};
                        song["id"] = result.playlistSongs[i].song.id;
                        song["title"] = result.playlistSongs[i].song.title;
                        song["artist"] = result.playlistSongs[i].song.artist;
                        song["duration"] = result.playlistSongs[i].song.duration;
                        song["album"] = result.playlistSongs[i].song.album;
                        song["connector"] = result.playlistSongs[i].song.songSource.label;
                        song["stream"] = result.playlistSongs[i].song.stream;
                        songs.push(song);
                    }

                    object["songs"] = PlaylistController.sortSongByRank(songs,result.songRank);

                    res.json(object);
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
            var playlist = {};

            playlist["name"] = '';
            playlist["description"] = '';

            res.json(playlist);

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
            if (TypeChecker.isNumber(req.params._playlistId) == false)
            {
                logger.warn("getPlaylist : error", {"error": new Error("Invalid params. Found : " + typeof req.params)});
                res.status(400).send({"result": "Bad Request"});
            }

            let _id: number = req.params._playlistId;

            new PlaylistBusiness().findById(_id, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.getEditionView -> findById : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    var object = {};
                    object["id"] = result.id;
                    object["name"] = result.name;
                    object["description"] = result.description;

                    res.json(object);
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
            new UserBusiness().findByLogin(res.locals.userToken.login, (error, result) => {

                if (TypeChecker.isString(req.body.name) == false
                    || TypeChecker.isString(req.body.description) == false
                )
                {
                    logger.warn("getEventDetails : error", {"error": new Error("Invalid body. Found : " + typeof req.body)});
                    res.status(400).send({"result": "Bad Request"});
                }

                var playlist = new Playlist();
                var playlistType = new PlaylistType();
                playlistType.label = "Playlist";
                playlistType.id = 1;

                playlist.name = req.body.name;
                playlist.description = req.body.description;
                playlist.songRank = '';
                playlist.playlistType = playlistType;
                playlist.temporary = false;
                playlist.user = result;

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

    //Update a playlist and all its sub elements
    update(req: express.Request, res: express.Response): void {
        try {

            new UserBusiness().findByLogin(res.locals.userToken.login, (error, result) => {
                    if (error) {
                        logger.warn("PlaylistController.update -> findByLogin : error", error);
                    }
                    else
                    {
                        if (TypeChecker.isString(req.body.name) == false
                            || TypeChecker.isString(req.body.description) == false
                            || TypeChecker.isNumber(req.body.id) == false
                            || TypeChecker.isArray(req.body.songs == false)
                        )
                        {
                            logger.warn("getEventDetails : error", {"error": new Error("Invalid body. Found : " + typeof req.body)});
                        }

                        let playlist = new Playlist();
                        let songsRank = [];
                        let songs = req.body.songs;

                        let playlistType = new PlaylistType();
                        playlistType.label = "Playlist";

                        playlist.id = req.body.id;
                        playlist.name = req.body.name;
                        playlist.description = req.body.description;
                        playlist.temporary = false;
                        playlist.user = result;

                        playlist.playlistType = playlistType;

                        for (let index = 0; index < songs.length; index++)
                        {
                            let source = new SongSourceBusiness().getSource(songs[index].connector);

                            new SongBusiness().findByStreamSource(songs[index].stream, source, (error, result) => {

                                if (error)
                                {
                                    logger.warn("PlaylistController.update -> findById songSource : error", error);
                                }
                                //LA SONG N'EXISTE PAS
                                else if (result == undefined)
                                {
                                    let song = new Song();
                                    song.title = songs[index].title;
                                    song.album = songs[index].album;
                                    song.artist = songs[index].artist;
                                    song.duration = songs[index].duration;
                                    song.stream = songs[index].stream;

                                    new SongSourceBusiness().findById(source, (error, result) => {
                                        if (error)
                                        {
                                            logger.warn("PlaylistController.update -> findById songSource : error", error);
                                        }
                                        else
                                        {
                                            song.songSource = result;

                                            //CREATION DE LA SONG
                                            new SongBusiness().create(song, (error, result) => {
                                                if (error)
                                                {
                                                    logger.warn("PlaylistController.update -> create song : error", error);
                                                }
                                                else
                                                {
                                                    songsRank = PlaylistController.insertSongAtIndex(songsRank, index, result);

                                                    playlist.songRank = PlaylistController.getSongRankFromSongs(songsRank);

                                                    new PlaylistSongBusiness().findByIds(playlist.id, song.id, (error, result) => {
                                                        if (error)
                                                        {
                                                            logger.warn("PlaylistController.update : playlistSong creation error", error);
                                                        }
                                                        //LA PLAYLISTSONG N'EXISTE PAS
                                                        else if (result == undefined)
                                                        {
                                                            //CREATION DE LA PLAYLISTSONG
                                                            let playlistSong = new PlaylistSong();
                                                            playlistSong.addDate = new Date();
                                                            playlistSong.playcount = 0;
                                                            playlistSong.weight = 0;
                                                            playlistSong.totalweight = 0;
                                                            playlistSong.pending = false;
                                                            playlistSong.playlist = playlist;
                                                            playlistSong.song = song;

                                                            new PlaylistSongBusiness().create(playlistSong, (error, result) => {
                                                                if (error)
                                                                {
                                                                    logger.warn("PlaylistController.update : playlistSong creation error", error);
                                                                }
                                                                else
                                                                {
                                                                    //UPDATE DE LA PLAYLIST
                                                                    new PlaylistBusiness().update(playlist, (error, result) => {
                                                                        if (error)
                                                                        {
                                                                            logger.warn("PlaylistController.update -> update playlist : error", error);
                                                                        }
                                                                        else
                                                                        {
                                                                            playlist = result;
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        else //LA PLAYLISTSONG EXISTE
                                                        {
                                                            //UPDATE DE LA PLAYLIST
                                                            new PlaylistBusiness().update(playlist, (error, result) => {
                                                                if (error)
                                                                {
                                                                    logger.warn("PlaylistController.update -> update playlist : error", error);
                                                                }
                                                                else
                                                                {
                                                                    playlist = result;
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                else //LA SONG EXISTE
                                {
                                    let song = result;

                                    songsRank = PlaylistController.insertSongAtIndex(songsRank, index, song);

                                    playlist.songRank = PlaylistController.getSongRankFromSongs(songsRank);

                                    new PlaylistSongBusiness().findByIds(playlist.id, song.id, (error, result) => {
                                        if (error)
                                        {
                                            logger.warn("PlaylistController.update : playlistSong creation error", error);
                                        }
                                        //LA PLAYLISTSONG N'EXISTE PAS
                                        else if (result == undefined)
                                        {
                                            //CREATION DE LA PLAYLISTSONG
                                            let playlistSong = new PlaylistSong();
                                            playlistSong.addDate = new Date();
                                            playlistSong.playcount = 0;
                                            playlistSong.weight = 0;
                                            playlistSong.totalweight = 0;
                                            playlistSong.pending = false;
                                            playlistSong.playlist = playlist;
                                            playlistSong.song = song;

                                            new PlaylistSongBusiness().create(playlistSong, (error, result) => {
                                                if (error)
                                                {
                                                    logger.warn("PlaylistController.update : playlistSong creation error", error);
                                                }
                                                else
                                                {
                                                    //UPDATE DE LA PLAYLIST
                                                    new PlaylistBusiness().update(playlist, (error, result) => {
                                                        if (error)
                                                        {
                                                            logger.warn("PlaylistController.update -> update playlist : error", error);
                                                        }
                                                        else
                                                        {
                                                            playlist = result;
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else //LA PLAYLISTSONG EXISTE
                                        {
                                            //UPDATE DE LA PLAYLIST
                                            new PlaylistBusiness().update(playlist, (error, result) => {
                                                if (error)
                                                {
                                                    logger.warn("PlaylistController.update -> update playlist : error", error);
                                                }
                                                else
                                                {
                                                    playlist = result;
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        res.status(200).send({"result": "Updated"});
                    }
                }
            )
        }
        catch(error){
            logger.warn("PlaylistController.update -> catch : error", error);
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Delete a playlist
    delete(req: express.Request, res: express.Response): void {
        try {

            new PlaylistBusiness().findById(req.params._playlistId, (error, result) => {
                if(error)
                {
                    logger.warn("PlaylistController.delete -> findById : error", error);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    new PlaylistBusiness().delete(result, (error, result) => {
                        if (error)
                        {
                            logger.warn("PlaylistController.delete : error", error);
                            res.status(400).send({"result": "Bad Request"});
                        }
                        else
                            res.status(200).send({"result": "Deleted", "data": result});
                    });
                }
            })
        }
        catch (e)  {
            logger.error("PlaylistController.delete : error", e);
            res.status(400).send({"result": "Bad Request"});

        }
    }

    static sortSongByRank(songs : Song[],songRank): Song[] {

        let songsSorted = [];
        let ranks = [];
        ranks = songRank.split(',');

        for(let i = 0; i < songs.length; i++)
        {
            for (let j = 0; j < ranks.length; j++) {

                if(songs[i].id == ranks[j]) {

                    let index: number = 0;
                    index = j;

                    songsSorted[index] = songs[i];
                }
            }
        }
        return songsSorted;
    }

    static insertSongAtIndex(songs: Song[], index, song) : Song[] {

        songs.splice(index, 0, song);

        return songs;
    }

    static deleteSongById(songs: Song[], id: number) : Song[] {


        let index = songs.findIndex((song) => {
            return song.id == id;
        });

        if(index != -1)
        {
            songs.splice(index, 1);
        }

        return songs;
    }

    static getSongRankFromSongs(songs: Song[]) : string {

        let songRank = '';

        for(let i = 0; i < songs.length; i++)
        {
            songRank += songs[i].id + ',';
        }

        return songRank.substring(0,songRank.length - 1);
    }

}
export = PlaylistController;