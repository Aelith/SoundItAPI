/**
 * Created by Lakio on 20/01/2017.
 */

import PlaylistRepository = require("../repository/postgres/PlaylistRepository");
import {Playlist} from "../model/postgres/Playlist";
import BaseBusiness = require("./interfaces/BaseBusiness");
import PlaylistSongRepository = require("../repository/postgres/PlaylistSongRepository");

class PlaylistBusiness extends BaseBusiness<Playlist> {

    private playlistRepository: PlaylistRepository;
    private playlistSongRepository: PlaylistSongRepository;

    constructor () {
        super(Playlist);
        this.playlistRepository = new PlaylistRepository();
        this.playlistSongRepository= new PlaylistSongRepository();
    }

    create (item: Playlist, callback: (error: any, result: any) => void) {
        this.playlistRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this.playlistRepository.retrieve(callback);
    }

    update (item: Playlist, callback: (error: any, result: any) => void) {
        //TODO
        this.playlistRepository.findById(item.id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                this.playlistRepository.update(item, callback);
            }
        });
    }

    delete(item: Playlist, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: Playlist) => void) {
        // this.playlistRepository.findById(_id, callback);
        this.playlistRepository.findCustomHydratedById(_id, [PlaylistRepository.eProperty.Songs,PlaylistRepository.eProperty.PlaylistType],callback);
    }

    getPlaylistsWithDetails(callback: (error: any, result: any) => void){
        //TODO

    }

    getUserSettings (_id: number, callback: (error: any, result: any) => void) {
        //TODO
    }
}

Object.seal(PlaylistBusiness);
export = PlaylistBusiness;