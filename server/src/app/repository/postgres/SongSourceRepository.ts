/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {SongSource} from "../../model/postgres/SongSource";


class SongSourceRepository extends BaseRepository<SongSource> {

    constructor() {
        super(SongSource);
    }

}

export = SongSourceRepository;