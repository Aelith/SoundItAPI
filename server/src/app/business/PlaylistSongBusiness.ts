/**
 * Created by Lakio on 26/01/2017.
 */

import PlaylistSongRepository = require("../repository/postgres/PlaylistSongRepository");
import BaseBusiness = require("./interfaces/BaseBusiness");
import {PlaylistSong} from "../model/postgres/PlaylistSong";

class PlaylistSongBusiness extends BaseBusiness<PlaylistSong> {

    private playlistSongRepository: PlaylistSongRepository;

    constructor () {
        super(PlaylistSong);
        this.playlistSongRepository= new PlaylistSongRepository();
    }

    create (item: PlaylistSong, callback: (error: any, result: any) => void) {
        this.playlistSongRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this.playlistSongRepository.retrieve(callback);
    }

    update (item: PlaylistSong, callback: (error: any, result: any) => void) {
        //TODO
        this.playlistSongRepository.update(item, callback);
    }

    delete(item: PlaylistSong, callback: (error: any, result: any) => void){
        this.playlistSongRepository.delete(item,callback);
    }

    findByPlaylistId (_id: number, callback: (error: any, result: PlaylistSong[]) => void) {
        this.playlistSongRepository.findByPlaylistId(_id,callback);
    }

    findByIds(idPlaylist: number,idSong: number, callback: (error: any, result: any) => void){
        this.playlistSongRepository.findByIds(idPlaylist,idSong,callback);
    }
}

Object.seal(PlaylistSongBusiness);
export = PlaylistSongBusiness;