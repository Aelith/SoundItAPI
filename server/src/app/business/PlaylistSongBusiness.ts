/**
 * Created by Lakio on 26/01/2017.
 */

import PlaylistSongRepository = require("../repository/postgres/PlaylistSongRepository");
import BaseBusiness = require("./interfaces/BaseBusiness");
import {PlaylistSong} from "../model/postgres/PlaylistSong";
import logger = require("../../tools/Logger");

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
        let PS = item;

        this.playlistSongRepository.deleteByIds(item.playlist.id, item.song.id,(error, result) => {
            if(error)
            {
                logger.warn("PlaylistSongBusiness.update -> delete playlistsong : error", error);
            }
            else
            {
                this.playlistSongRepository.create(PS, callback);
            }
        });
    }

    delete(item: PlaylistSong, callback: (error: any, result: any) => void){
        this.playlistSongRepository.delete(item,callback);
    }

    findByPlaylistId (_id: number, callback: (error: any, result: PlaylistSong[]) => void) {
        this.playlistSongRepository.findByPlaylistId(_id,callback);
    }

    findByIds(idPlaylist: number,idSong: number, callback: (error: any, result: any) => void){
        this.playlistSongRepository.findHydratedByIds(idPlaylist,idSong,callback);
    }

    getNextSongByWeight(id: number, callback : (error : any, result:any) => void) {
        this.playlistSongRepository.findNextSongForPlaylist(id,callback);
    }

}

Object.seal(PlaylistSongBusiness);
export = PlaylistSongBusiness;