/**
 * Created by Lakio on 26/01/2017.
 */

import SongSourceRepository = require("../repository/postgres/SongSourceRepository");
import {SongSource} from "../model/postgres/SongSource";
import BaseBusiness = require("./interfaces/BaseBusiness");
import SongRepository = require("../repository/postgres/SongRepository");

class SongSourceBusiness extends BaseBusiness<SongSource> {

    private songSourceRepository: SongSourceRepository;

    constructor () {
        super(SongSource);
        this.songSourceRepository = new SongSourceRepository();
    }

    retrieve (callback: (error: any, result: any) => void) {
        this.songSourceRepository.retrieve(callback);
    }

    findById (_id: number, callback: (error: any, result: SongSource) => void) {
        this.songSourceRepository.findById(_id, callback);
    }


    getSource(connector: string) : any {

        var source;

        switch(connector)
        {
            case 'Youtube':
                source = SongRepository.eSongSource.Youtube;
                break;
            case 'Deezer':
                source = SongRepository.eSongSource.Deezer;
                break;
            case 'Soundcloud':
                source = SongRepository.eSongSource.Soundcloud;
                break;
            case 'Spotify':
                source = SongRepository.eSongSource.Spotify;
                break;
            default:
                source = SongRepository.eSongSource.Youtube;
                break;
        }

        return source;
    }

}

Object.seal(SongSourceBusiness);
export = SongSourceBusiness;