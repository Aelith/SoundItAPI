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
        this.playlistRepository.update(item, callback);
    }

    delete(item: Playlist, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: Playlist) => void) {
        this.playlistRepository.findCustomHydratedById(_id, [PlaylistRepository.eProperty.Songs,PlaylistRepository.eProperty.SongSources],callback);
    }

    findByUserId(id: number, callback: (error: any, result: any) => void){
        //TODO
        this.playlistRepository.findByUserId(id,callback);
    }

}

Object.seal(PlaylistBusiness);
export = PlaylistBusiness;