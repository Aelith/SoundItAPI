/**
 * Created by Lakio on 20/01/2017.
 */

import PlaylistRepository = require("../repository/postgres/PlaylistRepository");
import {Playlist} from "../model/postgres/Playlist";
import BaseBusiness = require("./interfaces/BaseBusiness");

class PlaylistBusiness extends BaseBusiness<Playlist> {

    private _playlistRepository: PlaylistRepository;

    constructor () {
        super(Playlist);
        this._playlistRepository = new PlaylistRepository();
    }

    create (item: Playlist, callback: (error: any, result: any) => void) {
        this._playlistRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._playlistRepository.retrieve(callback);
    }

    update (item: Playlist, callback: (error: any, result: any) => void) {
        //TODO
        this._playlistRepository.findById(item.id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                this._playlistRepository.update(item, callback);
            }
        });
    }

    delete(item: Playlist, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: Playlist) => void) {
        this._playlistRepository.findById(_id, callback);
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