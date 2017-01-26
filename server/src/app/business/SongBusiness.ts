/**
 * Created by Lakio on 23/01/2017.
 */

import SongRepository = require("../repository/postgres/SongRepository");
import {Song} from "../model/postgres/Song";
import BaseBusiness = require("./interfaces/BaseBusiness");

class SongBusiness extends BaseBusiness<Song> {

    private songRepository: SongRepository;

    constructor () {
        super(Song);
        this.songRepository = new SongRepository();
    }

    retrieve (callback: (error: any, result: any) => void) {
        this.songRepository.retrieve(callback);
    }

    findById (_id: number, callback: (error: any, result: Song) => void) {
        this.songRepository.findById(_id, callback);
    }

    findByStreamSource (stream:string, source:string, callback: (error: any, result: Song) => void) {
        this.songRepository.findByStreamAndSource(stream, SongRepository.eSongSource.Youtube, callback);
    }

}

Object.seal(SongBusiness);
export = SongBusiness;